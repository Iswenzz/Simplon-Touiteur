<?php

namespace App\Controller;

use App\Entity\Comment;
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
 * Class CommentController
 * @package App\Controller
 * @Route("/api")
 */
class CommentController extends AbstractController
{
	/**
	 * Delete a comment.
	 * @Route("/comment/{id}", methods={"DELETE"})
	 * @param int $id - Comment id.
	 */
	public function deleteOne(int $id)
	{
		/**
		 * @var Follower $comment
		 */
		$entityManager = $this->getDoctrine()->getManager();
		$comment = $entityManager->getRepository(Comment::class)->find($id);
		$entityManager->remove($comment);
		$entityManager->flush();
	}

	/**
	 * Update a comment.
	 * @Route("/comment/{id}", methods={"PUT"})
	 * @param int $id - Comment id.
	 * @param Request $request
	 * @param ValidatorInterface $validator
	 * @return JsonResponse
	 */
	public function updateOne(int $id, Request $request, ValidatorInterface $validator): JsonResponse
	{
		/**
		 * @var Follower $comment
		 */
		$entityManager = $this->getDoctrine()->getManager();
		$comment = $entityManager->getRepository(Comment::class)->find($id);
		$data = json_decode($request->getContent(), true);

		if ($comment && isset($data["date"]) && isset($data["content"]))
		{
			$comment->setDate($data["date"]);
			$comment->setContent($data["content"]);

			// validate
			$errors = $validator->validate($comment);
			if (count($errors))
				return $this->json(["success" => false, "error" => $errors->get(0)->getMessage()]);

			$entityManager->persist($comment);
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
	 * Create a comment.
	 * @Route("/comment", methods={"POST"})
	 * @param Request $request
	 * @param ValidatorInterface $validator
	 * @return JsonResponse
	 */
	public function createOne(Request $request, ValidatorInterface $validator): JsonResponse
	{
		/**
		 * @var Follower $comment
		 */
		$entityManager = $this->getDoctrine()->getManager();
		$comment = new Comment();
		$data = json_decode($request->getContent(), true);

		if ($comment && isset($data["date"]) && isset($data["content"]))
		{
			/**
			 * @var User $user
			 */
			$user = $this->getUser();

			$comment->setAuthor($user);
			$comment->setDate($data["date"]);
			$comment->setContent($data["content"]);

			// validate
			$errors = $validator->validate($comment);
			if (count($errors))
				return $this->json(["success" => false, "error" => $errors->get(0)->getMessage()]);

			$entityManager->persist($comment);
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
	 * Get a comment.
	 * @Route("/comment/{id}", methods={"GET"})
	 * @param int $id - Comment id.
	 * @return JsonResponse
	 */
	public function getOne(int $id)
	{
		$classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
		$serializer = new Serializer([new ObjectNormalizer($classMetadataFactory)], [new JsonEncoder()]);
		$comment = $this->getDoctrine()->getRepository(Comment::class)->find($id);

		$json = json_decode($serializer->serialize($comment, "json", [
			"groups" => ["comment"]
		]), true);

		return $this->json([
			"success" => true,
			"comment" => $json
		]);
	}

	/**
	 * Get all comments.
	 * @Route("/comments", methods={"GET"})
	 * @return JsonResponse
	 */
	public function getAll(): JsonResponse
	{
		$classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
		$serializer = new Serializer([new ObjectNormalizer($classMetadataFactory)], [new JsonEncoder()]);
		$comments = $this->getDoctrine()->getRepository(Comment::class)->findAll();

		$json = json_decode($serializer->serialize($comments, "json", [
			"groups" => ["comment"]
		]), true);

		return $this->json([
			"success" => true,
			"comments" => $json
		]);
	}
}
