<?php

namespace App\Controller;

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
 * Class TweetController
 * @package App\Controller
 * @Route("/api")
 */
class TweetController extends AbstractController
{
	/**
	 * Delete a tweet.
	 * @Route("/tweet/{id}", methods={"DELETE"})
	 * @param int $id - tweet id.
	 */
	public function deleteOne(int $id)
	{
		/**
		 * @var Tweet $tweet
		 */
		$entityManager = $this->getDoctrine()->getManager();
		$tweet = $entityManager->getRepository(Tweet::class)->find($id);
		$entityManager->remove($tweet);
		$entityManager->flush();
	}

	/**
	 * Update a tweet.
	 * @Route("/tweet/{id}", methods={"PUT"})
	 * @param int $id - tweet id.
	 * @param Request $request
	 * @param ValidatorInterface $validator
	 * @return JsonResponse
	 */
	public function updateOne(int $id, Request $request, ValidatorInterface $validator): JsonResponse
	{
		/**
		 * @var Tweet $tweet
		 */
		$entityManager = $this->getDoctrine()->getManager();
		$tweet = $entityManager->getRepository(Tweet::class)->find($id);
		$data = json_decode($request->getContent(), true);

		if ($tweet && isset($data["content"]))
		{
			// encode the plain password
			$tweet->setContent($data["content"]);

			// validate
			$errors = $validator->validate($tweet);
			if (count($errors))
				return $this->json(["success" => false, "error" => $errors->get(0)->getMessage()]);

			$entityManager->persist($tweet);
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
	 * Create a tweet.
	 * @Route("/tweet", methods={"POST"})
	 * @param Request $request
	 * @param ValidatorInterface $validator
	 * @return JsonResponse
	 */
	public function createOne(Request $request, ValidatorInterface $validator): JsonResponse
	{
		$entityManager = $this->getDoctrine()->getManager();
		$tweet = new Tweet();
		$data = json_decode($request->getContent(), true);

		if (isset($data["content"]) && isset($data["user"]["id"]))
		{
			/**
			 * @var User $user
			 */
			$user = $entityManager->getRepository(User::class)->find($data["user"]["id"]);

			// encode the plain password
			$tweet->setContent($data["content"]);
			$tweet->setCreatedAt(new DateTime("NOW"));
			$tweet->setAuthor($user);

			// validate
			$errors = $validator->validate($tweet);
			if (count($errors))
				return $this->json(["success" => false, "error" => $errors->get(0)->getMessage()]);

			$entityManager->persist($tweet);
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
	 * Get a tweet.
	 * @Route("/tweet/{id}", methods={"GET"})
	 * @param int $id - tweet id.
	 * @return JsonResponse
	 */
	public function getOne(int $id)
	{
		$classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
		$serializer = new Serializer([new ObjectNormalizer($classMetadataFactory)], [new JsonEncoder()]);
		$tweet = $this->getDoctrine()->getRepository(Tweet::class)->find($id);

		$json = json_decode($serializer->serialize($tweet, "json", [
			"groups" => ["tweet"]
		]), true);

		return $this->json([
			"success" => true,
			"tweet" => $json
		]);
	}

	/**
	 * Get all tweets.
	 * @Route("/tweets", methods={"GET"})
	 * @return JsonResponse
	 */
	public function getAll(): JsonResponse
	{
		$classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
		$serializer = new Serializer([new ObjectNormalizer($classMetadataFactory)], [new JsonEncoder()]);
		$tweets = $this->getDoctrine()->getRepository(Tweet::class)->findAll();

		$json = json_decode($serializer->serialize($tweets, "json", [
			"groups" => ["tweet"]
		]), true);

		return $this->json([
			"success" => true,
			"tweets" => $json
		]);
	}
}
