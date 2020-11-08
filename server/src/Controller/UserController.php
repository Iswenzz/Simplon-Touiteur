<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\Common\Annotations\AnnotationReader;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactory;
use Symfony\Component\Serializer\Mapping\Loader\AnnotationLoader;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * Class UserController
 * @package App\Controller
 * @Route("/api")
 */
class UserController extends AbstractController
{
	/**
	 * Delete a user.
	 * @Route("/user/{id}", methods={"DELETE"})
	 * @param int $id - User id.
	 */
	public function deleteOne(int $id)
	{
		/**
		 * @var User $user
		 */
		$entityManager = $this->getDoctrine()->getManager();
		$user = $entityManager->getRepository(User::class)->find($id);
		$entityManager->remove($user);
		$entityManager->flush();
	}

	/**
	 * Update a user.
	 * @Route("/user/{id}", methods={"PUT"})
	 * @param int $id - User id.
	 * @param Request $request
	 * @param ValidatorInterface $validator
	 * @return JsonResponse
	 */
	public function updateOne(int $id, Request $request, ValidatorInterface $validator): JsonResponse
	{
		/**
		 * @var User $user
		 */
		$entityManager = $this->getDoctrine()->getManager();
		$user = $entityManager->getRepository(User::class)->find($id);
		$data = json_decode($request->getContent(), true);

		if ($user && isset($data["firstname"]) && isset($data["lastname"])
			&& isset($data["location"]) && isset($data["bio"]))
		{
			$user->setName($data["firstname"] . " " . $data["lastname"]);
			$user->setBirthdate($data["birthdate"] ?? null);
			$user->setBio($data["bio"]);
			$user->setLocation(null); // TODO

			// validate
			$errors = $validator->validate($user);
			if (count($errors))
				return $this->json(["success" => false, "message" => $errors->get(0)->getMessage()]);

			$entityManager->persist($user);
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
	 * Get a user.
	 * @Route("/user/{username}", methods={"GET"})
	 * @param string $username
	 * @return JsonResponse
	 */
	public function getOne(string $username)
	{
		$classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
		$serializer = new Serializer([new ObjectNormalizer($classMetadataFactory)], [new JsonEncoder()]);
		$user = $this->getDoctrine()->getRepository(User::class)->findOneBy([
			"username" => $username
		]);

		$json = json_decode($serializer->serialize($user, "json", [
			"groups" => ["user"]
		]), true);

		return $this->json([
			"success" => true,
			"user" => $json
		]);
	}

	/**
	 * Get all users.
	 * @Route("/users", methods={"GET"})
	 * @return JsonResponse
	 */
	public function getAll(): JsonResponse
	{
		$classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
		$serializer = new Serializer([new ObjectNormalizer($classMetadataFactory)], [new JsonEncoder()]);
		$users = $this->getDoctrine()->getRepository(User::class)->findAll();

		$json = json_decode($serializer->serialize($users, "json", [
			"groups" => ["user"]
		]), true);

		return $this->json([
			"success" => true,
			"users" => $json
		]);
	}
}
