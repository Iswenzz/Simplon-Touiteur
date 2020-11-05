<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
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
 * Class HashtagController
 * @package App\Controller
 * @Route("/api")
 */

class HashtagController extends AbstractController
{
   /**
     * @Route("/hashtag/{id}", methods={"DELETE})
     * @param int $id - Hashtag id.
     */
         
    public function deleteOne(int $id)
	{
        /**
		 * @var Hashtag $hashtag
		 */
		$entityManager = $this->getDoctrine()->getManager();
		$hashtag = $entityManager->getRepository(Hashtag::class)->find($id);
		$entityManager->remove($hashtag);
		$entityManager->flush();
    }

    /**
	 * @Route("/hashtag/{id}", methods={"PUT"})
	 * @param int $id - Hashtag id.
	 * @param Request $request
	 * @param ValidatorInterface $validator
	 * @return JsonResponse
	 */
    public function updateOne(int $id, Request $request, ValidatorInterface $validator): JsonResponse
	{
        /**
		 * @var Hashtag $hashtag
		 */
		$entityManager = $this->getDoctrine()->getManager();
		$hashtag = $entityManager->getRepository(Hashtag::class)->find($id);
        $data = json_decode($request->getContent(), true);

        if ($hashtag && isset($data["name"]) && isset($data["date"]) && isset($data["tweet"]))
            
		{
            $hashtag->setName($data["name"]);
			$hashtag->setDate($data["date"] ?? null);			
			$hashtag->setBio($data["tweet"]);

			// validate
			$errors = $validator->validate($hashtag);
			if (count($errors))
				return $this->json(["success" => false, "error" => $errors->get(0)->getMessage()]);

			$entityManager->persist($hashtag);
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
	 * @Route("/hashtag/{id}", methods={"GET"})
	 * @param int $id - Hashtag id.
	 * @return JsonResponse
	 */

    public function getOne(int $id)
	{
        $classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
		$serializer = new Serializer([new ObjectNormalizer($classMetadataFactory)], [new JsonEncoder()]);
		$hashtag = $this->getDoctrine()->getRepository(Hashtag::class)->find($id);

		$json = json_decode($serializer->serialize($hashtag, "json", [
			"groups" => ["hashtag"]
		]), true);

		return $this->json([
			"success" => true,
			"hashtag" => $json
		]);
    }
    
    /**
	 * @Route("/hashtags", methods={"GET"})
	 * @return JsonResponse
	 */
    public function getAll(): JsonResponse
	{
		$classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
		$serializer = new Serializer([new ObjectNormalizer($classMetadataFactory)], [new JsonEncoder()]);
		$hashtags = $this->getDoctrine()->getRepository(Hashtag::class)->findAll();

		$json = json_decode($serializer->serialize($hashtags, "json", [
			"groups" => ["hashtag"]
		]), true);

		return $this->json([
			"success" => true,
			"hashtags" => $json
		]);
	}
}

