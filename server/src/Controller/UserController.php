<?php

namespace App\Controller;

use App\Entity\User;
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

/**
 * Class UserController
 * @package App\Controller
 * @Route("/api")
 */
class UserController extends AbstractController
{
	/**
	 * @Route("/user/all", name="user")
	 * @param Request $request
	 * @return JsonResponse
	 */
	public function all(Request $request): JsonResponse
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
