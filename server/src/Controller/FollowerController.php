<?php

namespace App\Controller;

use App\Entity\Follower;
use App\Entity\User;
use Doctrine\Common\Annotations\AnnotationReader;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Mapping\Loader\AnnotationLoader;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactory;
use Symfony\Component\Serializer\Encoder\JsonEncoder;

/**
 * Class FollowerController
 * @package App\Controller
 * @Route("/api")
 */
class FollowerController extends AbstractController
{

	/**
	 * Delete a follower.
	 * @Route("/follower/{id}", methods={"DELETE"})
	 * @param int $id - Follower id.
	 */
	public function deleteOne(int $id)
	{
		/**
		 * @var Follower $follower
		 */
		$entityManager = $this->getDoctrine()->getManager();
		$follower = $entityManager->getRepository(Follower::class)->find($id);
		$entityManager->remove($follower);
		$entityManager->flush();
	}

	/**
	 * Update a follower.
	 * @Route("/follower/{id}", methods={"PUT"})
	 * @param int $id - Follower id.
	 * @param Request $request
	 * @param ValidatorInterface $validator
	 * @return JsonResponse
	 */
	public function updateOne(int $id, Request $request, ValidatorInterface $validator): JsonResponse
	{
		/**
		 * @var Follower $follower
		 */
		$entityManager = $this->getDoctrine()->getManager();
		$follower = $entityManager->getRepository(Follower::class)->find($id);
		$data = json_decode($request->getContent(), true);

		if ($follower && isset($data["date"]) && isset($data["user"]["id"])
			&& isset($data["follow"]["id"]))
		{
			/**
			 * @var User $user
			 * @var User $follow
			 */
			$user = $entityManager->getRepository(User::class)->find($data["user"]["id"]);
			$follow = $entityManager->getRepository(User::class)->find($data["follow"]["id"]);

			$follower->setDate($data["date"] ?? null);
			$follower->setUser($user);
			$follower->setFollow($follow);

			// validate
			$errors = $validator->validate($follower);
			if (count($errors))
				return $this->json(["success" => false, "error" => $errors->get(0)->getMessage()]);

			$entityManager->persist($follower);
			$entityManager->flush();

			return $this->json([
				"success" => true
			]);
		}
		return $this->json([
			"success" => false
		], 400);
	}

	/**
	 * Create a follower.
	 * @Route("/follower", methods={"POST"})
	 * @param Request $request
	 * @param ValidatorInterface $validator
	 * @return JsonResponse
	 */
	public function createOne(Request $request, ValidatorInterface $validator): JsonResponse
	{
		/**
		 * @var Follower $follower
		 */
		$entityManager = $this->getDoctrine()->getManager();
		$follower = new Follower();
		$data = json_decode($request->getContent(), true);

		if ($follower && isset($data["date"]) && isset($data["user"]["id"])
			&& isset($data["follow"]["id"]))
		{
			/**
			 * @var User $user
			 * @var User $follow
			 */
			$user = $entityManager->getRepository(User::class)->find($data["user"]["id"]);
			$follow = $entityManager->getRepository(User::class)->find($data["follow"]["id"]);

			$follower->setDate($data["date"] ?? null);
			$follower->setUser($user);
			$follower->setFollow($follow);

			// validate
			$errors = $validator->validate($follower);
			if (count($errors))
				return $this->json(["success" => false, "error" => $errors->get(0)->getMessage()]);

			$entityManager->persist($follower);
			$entityManager->flush();

			return $this->json([
				"success" => true
			]);
		}
		return $this->json([
			"success" => false
		], 400);
	}

	/**
	 * Get a follower.
	 * @Route("/follower/{id}", methods={"GET"})
	 * @param int $id - Follower id.
	 * @return JsonResponse
	 */
	public function getOne(int $id)
	{
		$classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
		$serializer = new Serializer([new ObjectNormalizer($classMetadataFactory)], [new JsonEncoder()]);
		$follower = $this->getDoctrine()->getRepository(Follower::class)->find($id);

		$json = json_decode($serializer->serialize($follower, "json", [
			"groups" => ["follower"]
		]), true);

		return $this->json([
			"success" => true,
			"follower" => $json
		]);
	}

	/**
	 * Get all followers.
	 * @Route("/followers", methods={"GET"})
	 * @return JsonResponse
	 */
	public function getAll(): JsonResponse
	{
		$classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
		$serializer = new Serializer([new ObjectNormalizer($classMetadataFactory)], [new JsonEncoder()]);
		$followers = $this->getDoctrine()->getRepository(Follower::class)->findAll();

		$json = json_decode($serializer->serialize($followers, "json", [
			"groups" => ["follower"]
		]), true);

		return $this->json([
			"success" => true,
			"followers" => $json
		]);
	}
}
