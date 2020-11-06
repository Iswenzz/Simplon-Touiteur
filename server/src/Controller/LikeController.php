<?php

namespace App\Controller;

use App\Entity\Like;
use App\Entity\Tweet;
use App\Entity\User;
use DateTime;
use Doctrine\Common\Annotations\AnnotationReader;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactory;
use Symfony\Component\Serializer\Mapping\Loader\AnnotationLoader;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * Class LikeController
 * @package App\Controller
 * @Route("/api")
 */
class LikeController extends AbstractController
{
	/**
	 * Delete a like.
	 * @Route("/like/{id}", methods={"DELETE"})
	 * @param int $id - like id.
	 */
	public function deleteOne(int $id)
	{
		/**
		 * @var Like $like
		 */
		$entityManager = $this->getDoctrine()->getManager();
		$like = $entityManager->getRepository(Like::class)->find($id);
		$entityManager->remove($like);
		$entityManager->flush();
	}

	/**
	 * Create a like.
	 * @Route("/like", methods={"POST"})
	 * @param Request $request
	 * @param ValidatorInterface $validator
	 * @return JsonResponse
	 */
	public function createOne(Request $request, ValidatorInterface $validator): JsonResponse
	{
		$entityManager = $this->getDoctrine()->getManager();
		$like = new Like();
		$data = json_decode($request->getContent(), true);

		if (isset($data["content"]) && isset($data["tweet"]["id"]))
		{
			/**
			 * @var User $user
			 * @var Tweet $tweet
			 */
			$user = $this->getUser();
			$tweet = $entityManager->getRepository(Tweet::class)->find($data["tweet"]["id"]);

			$like->setDate(new DateTime("NOW"));
			$like->setTweet($tweet);
			$like->setUser($user);

			// validate
			$errors = $validator->validate($like);
			if (count($errors))
				return $this->json(["success" => false, "error" => $errors->get(0)->getMessage()]);

			$entityManager->persist($like);
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
	 * Get a like.
	 * @Route("/like/{id}", methods={"GET"})
	 * @param int $id - like id.
	 * @return JsonResponse
	 */
	public function getOne(int $id)
	{
		$classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
		$serializer = new Serializer([new ObjectNormalizer($classMetadataFactory)], [new JsonEncoder()]);
		$like = $this->getDoctrine()->getRepository(Like::class)->find($id);

		$json = json_decode($serializer->serialize($like, "json", [
			"groups" => ["like"]
		]), true);

		return $this->json([
			"success" => true,
			"like" => $json
		]);
	}

	/**
	 * Get all likes.
	 * @Route("/likes", methods={"GET"})
	 * @return JsonResponse
	 */
	public function getAll(): JsonResponse
	{
		$classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
		$serializer = new Serializer([new ObjectNormalizer($classMetadataFactory)], [new JsonEncoder()]);
		$likes = $this->getDoctrine()->getRepository(Like::class)->findAll();

		$json = json_decode($serializer->serialize($likes, "json", [
			"groups" => ["like"]
		]), true);

		return $this->json([
			"success" => true,
			"likes" => $json
		]);
	}
}
