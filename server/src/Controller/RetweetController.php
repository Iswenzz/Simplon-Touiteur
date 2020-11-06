<?php

namespace App\Controller;

use App\Entity\Retweet;
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
 * Class RetweetController
 * @package App\Controller
 * @Route("/api")
 */
class RetweetController extends AbstractController
{
	/**
	 * Delete a retweet.
	 * @Route("/retweet/{id}", methods={"DELETE"})
	 * @param int $id - retweet id.
	 */
	public function deleteOne(int $id)
	{
		/**
		 * @var Retweet $retweet
		 */
		$entityManager = $this->getDoctrine()->getManager();
		$retweet = $entityManager->getRepository(Retweet::class)->find($id);
		$entityManager->remove($retweet);
		$entityManager->flush();
	}

	/**
	 * Create a retweet.
	 * @Route("/retweet", methods={"POST"})
	 * @param Request $request
	 * @param ValidatorInterface $validator
	 * @return JsonResponse
	 */
	public function createOne(Request $request, ValidatorInterface $validator): JsonResponse
	{
		$entityManager = $this->getDoctrine()->getManager();
		$retweet = new Retweet();
		$data = json_decode($request->getContent(), true);

		if (isset($data["content"]) && isset($data["user"]["id"]) && isset($data["tweet"]["id"]))
		{
			/**
			 * @var User $user
			 * @var Tweet $tweet
			 */
			$user = $entityManager->getRepository(User::class)->find($data["user"]["id"]);
			$tweet = $entityManager->getRepository(Tweet::class)->find($data["tweet"]["id"]);

			$retweet->setDate(new DateTime("NOW"));
			$retweet->setTweet($tweet);
			$retweet->setUser($user);

			// validate
			$errors = $validator->validate($retweet);
			if (count($errors))
				return $this->json(["success" => false, "error" => $errors->get(0)->getMessage()]);

			$entityManager->persist($retweet);
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
	 * Get a retweet.
	 * @Route("/retweet/{id}", methods={"GET"})
	 * @param int $id - retweet id.
	 * @return JsonResponse
	 */
	public function getOne(int $id)
	{
		$classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
		$serializer = new Serializer([new ObjectNormalizer($classMetadataFactory)], [new JsonEncoder()]);
		$retweet = $this->getDoctrine()->getRepository(Retweet::class)->find($id);

		$json = json_decode($serializer->serialize($retweet, "json", [
			"groups" => ["retweet"]
		]), true);

		return $this->json([
			"success" => true,
			"retweet" => $json
		]);
	}

	/**
	 * Get all retweets.
	 * @Route("/retweets", methods={"GET"})
	 * @return JsonResponse
	 */
	public function getAll(): JsonResponse
	{
		$classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
		$serializer = new Serializer([new ObjectNormalizer($classMetadataFactory)], [new JsonEncoder()]);
		$retweets = $this->getDoctrine()->getRepository(Retweet::class)->findAll();

		$json = json_decode($serializer->serialize($retweets, "json", [
			"groups" => ["retweet"]
		]), true);

		return $this->json([
			"success" => true,
			"retweets" => $json
		]);
	}
}
