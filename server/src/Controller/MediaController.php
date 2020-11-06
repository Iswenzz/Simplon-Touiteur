<?php

namespace App\Controller;

use App\Entity\Media;
use App\Entity\Tweet;
use App\Entity\User;
use Doctrine\Common\Annotations\AnnotationReader;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactory;
use Symfony\Component\Serializer\Mapping\Loader\AnnotationLoader;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * Class MediaController
 * @package App\Controller
 * @Route("/api")
 */
class MediaController extends AbstractController
{
	/**
	 * @Route("/media/{id}", methods={"DELETE"})
     * @param int $id - Media id.
	 */
	public function deleteOne(int $id)
	{
		/**
		 * @var Media $media
		 */
		$entityManager = $this->getDoctrine()->getManager();
		$media = $entityManager->getRepository(Media::class)->find($id);
		$entityManager->remove($media);
		$entityManager->flush();
	}

	/**
	 * @Route("/media/{id}", methods={"PUT"})
	 * @param int $id - Media id.
	 * @param Request $request
	 * @param ValidatorInterface $validator
	 * @return JsonResponse
	 */
	public function updateOne(int $id, Request $request, ValidatorInterface $validator): JsonResponse
	{
		/**
		 * @var Media $media
		 */
		$entityManager = $this->getDoctrine()->getManager();
		$media = $entityManager->getRepository(Media::class)->find($id);
		$data = json_decode($request->getContent(), true);

		if ($media && isset($data["date"]) && isset($data["tweet"]["id"]))
		{
			/**
			 * @var Tweet $tweet
			 * @var User $user
			 */
			$tweet = $entityManager->getRepository(Tweet::class)->find($data["tweet"]["id"]);
			$user = $this->getUser();

			$media->setUrl($data["url"]);
			$media->setDate($data["date"]);
			$media->setAuthor($user);
			$media->setTweet($tweet);

			// validate
			$errors = $validator->validate($media);
			if (count($errors))
				return $this->json(["success" => false, "error" => $errors->get(0)->getMessage()]);

			$entityManager->persist($media);
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
	 * @Route("/media/{id}", methods={"GET"})
	 * @param int $id - Media id.
	 * @return JsonResponse
	 */

	public function getOne(int $id)
	{
		$classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
		$serializer = new Serializer([new ObjectNormalizer($classMetadataFactory)], [new JsonEncoder()]);
		$media = $this->getDoctrine()->getRepository(Media::class)->find($id);

		$json = json_decode($serializer->serialize($media, "json", [
			"groups" => ["media"]
		]), true);

		return $this->json([
			"success" => true,
			"media" => $json
		]);
	}

	/**
	 * @Route("/medias", methods={"GET"})
	 * @return JsonResponse
	 */
	public function getAll(): JsonResponse
	{
		$classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
		$serializer = new Serializer([new ObjectNormalizer($classMetadataFactory)], [new JsonEncoder()]);
		$medias = $this->getDoctrine()->getRepository(Media::class)->findAll();

		$json = json_decode($serializer->serialize($medias, "json", [
			"groups" => ["media"]
		]), true);

		return $this->json([
			"success" => true,
			"medias" => $json
		]);
	}


	/**
	 * @Route("/media", methods={"POST"})
	 * @param Request $request
	 * @param ValidatorInterface $validator
	 * @return JsonResponse
	 */
	public function createOne(Request $request, ValidatorInterface $validator): JsonResponse
	{

		$entityManager = $this->getDoctrine()->getManager();
		$media = new Media();
		$data = json_decode($request->getContent(), true);

		if ($media && isset($data["date"]) && isset($data["tweet"]["id"]))
		{
			/**
			 * @var Tweet $tweet
			 * @var User $user
			 */
			$tweet = $entityManager->getRepository(Tweet::class)->find($data["tweet"]["id"]);
			$user = $this->getUser();

			$media->setUrl($data["url"]);
			$media->setDate($data["date"]);
			$media->setAuthor($user);
			$media->setTweet($tweet);

			// validate
			$errors = $validator->validate($media);
			if (count($errors))
				return $this->json(["success" => false, "error" => $errors->get(0)->getMessage()]);

			$entityManager->persist($media);
			$entityManager->flush();

			return $this->json([
				"success" => true
			]);
		}
		return $this->json([
			"success" => false
		], 400);
	}
}
