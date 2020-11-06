<?php

namespace App\Controller;

use App\Entity\Country;
use Doctrine\Common\Annotations\AnnotationReader;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactory;
use Symfony\Component\Serializer\Mapping\Loader\AnnotationLoader;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * Class CountryController
 * @package App\Controller
 * @Route("/api")
 */

class CountryController extends AbstractController
{
    /**
	 * @Route("/countries", methods={"GET"})
	 * @return JsonResponse
	 */
    public function getAll(): JsonResponse
	{
		$classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
		$serializer = new Serializer([new ObjectNormalizer($classMetadataFactory)], [new JsonEncoder()]);
		$countries = $this->getDoctrine()->getRepository(Country::class)->findAll();

		$json = json_decode($serializer->serialize($countries, "json", [
			"groups" => ["country"]
		]), true);

		return $this->json([
			"success" => true,
			"countries" => $json
		]);
	}

	/**
	 * @Route("/country", methods={"POST"})
	 * @param Request $request
	 * @param ValidatorInterface $validator
	 * @return JsonResponse
	 */
    public function createOne(Request $request, ValidatorInterface $validator): JsonResponse
	{
		$entityManager = $this->getDoctrine()->getManager();
		$country = new Country ();
        $data = json_decode($request->getContent(), true);

		if ($country && isset($data["name"]) && isset($data["code"]))
		{
            $country->setName($data["name"]);
			$country->setCode($data["code"]);			
			
			// validate
			$errors = $validator->validate($country);
			if (count($errors))
				return $this->json(["success" => false, "error" => $errors->get(0)->getMessage()]);

			$entityManager->persist($country);
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

