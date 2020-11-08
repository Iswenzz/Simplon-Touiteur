<?php

namespace App\Controller;

use App\Entity\Following;
use App\Entity\User;
use DateTime;
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
 * Class FollowingController
 * @package App\Controller
 * @Route("/api")
 */
class FollowingController extends AbstractController
{
	/**
	 * Delete a following.
	 * @Route("/following/{id}", methods={"DELETE"})
	 * @param int $id - Following id.
	 */
	public function deleteOne(int $id)
	{
		/**
		 * @var Following $following
		 */
		$entityManager = $this->getDoctrine()->getManager();
		$following = $entityManager->getRepository(Following::class)->find($id);
		$entityManager->remove($following);
		$entityManager->flush();
	}

	/**
	 * Update a following.
	 * @Route("/following/{id}", methods={"PUT"})
	 * @param int $id - Following id.
	 * @param Request $request
	 * @param ValidatorInterface $validator
	 * @return JsonResponse
	 */
	public function updateOne(int $id, Request $request, ValidatorInterface $validator): JsonResponse
	{
		/**
		 * @var Following $following
		 */
		$entityManager = $this->getDoctrine()->getManager();
		$following = $entityManager->getRepository(Following::class)->find($id);
		$data = json_decode($request->getContent(), true);

		if ($following && isset($data["follow"]["id"]))
		{
			/**
			 * @var User $user
			 * @var User $follow
			 */
			$user = $this->getUser();
			$follow = $entityManager->getRepository(User::class)->find($data["follow"]["id"]);

			$following->setUser($user);
			$following->setFollowing($follow);

			// validate
			$errors = $validator->validate($following);
			if (count($errors))
				return $this->json(["success" => false, "message" => $errors->get(0)->getMessage()]);

			$entityManager->persist($following);
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
	 * Create a following.
	 * @Route("/following", methods={"POST"})
	 * @param Request $request
	 * @param ValidatorInterface $validator
	 * @return JsonResponse
	 */
	public function createOne(Request $request, ValidatorInterface $validator): JsonResponse
	{
		/**
		 * @var Following $following
		 */
		$entityManager = $this->getDoctrine()->getManager();
		$following = new Following();
		$data = json_decode($request->getContent(), true);

		if ($following && isset($data["follow"]["id"]))
		{
			/**
			 * @var User $user
			 * @var User $follow
			 */
			$user = $this->getUser();
			$follow = $entityManager->getRepository(User::class)->find($data["follow"]["id"]);

			$following->setDate(new DateTime("NOW"));
			$following->setUser($user);
			$following->setFollowing($follow);

			// validate
			$errors = $validator->validate($following);
			if (count($errors))
				return $this->json(["success" => false, "message" => $errors->get(0)->getMessage()]);

			$entityManager->persist($following);
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
	 * Get a following.
	 * @Route("/following/{id}", methods={"GET"})
	 * @param int $id - Following id.
	 * @return JsonResponse
	 */
	public function getOne(int $id)
	{
		$classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
		$serializer = new Serializer([new ObjectNormalizer($classMetadataFactory)], [new JsonEncoder()]);
		$following = $this->getDoctrine()->getRepository(Following::class)->find($id);

		$json = json_decode($serializer->serialize($following, "json", [
			"groups" => ["following"]
		]), true);

		return $this->json([
			"success" => true,
			"following" => $json
		]);
	}

	/**
	 * Get all followings.
	 * @Route("/followings", methods={"GET"})
	 * @return JsonResponse
	 */
	public function getAll(): JsonResponse
	{
		$classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
		$serializer = new Serializer([new ObjectNormalizer($classMetadataFactory)], [new JsonEncoder()]);
		$followings = $this->getDoctrine()->getRepository(Following::class)->findAll();

		$json = json_decode($serializer->serialize($followings, "json", [
			"groups" => ["following"]
		]), true);

		return $this->json([
			"success" => true,
			"followings" => $json
		]);
	}
}
