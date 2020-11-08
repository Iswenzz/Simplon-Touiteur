<?php

namespace App\EventListener;

use Doctrine\Common\Annotations\AnnotationReader;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationFailureResponse;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactory;
use Symfony\Component\Serializer\Mapping\Loader\AnnotationLoader;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class AuthenticationListener
{
	/**
	 * Response on authentication success.
	 * @param AuthenticationSuccessEvent $event
	 */
	public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
	{
		$classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
		$serializer = new Serializer([new ObjectNormalizer($classMetadataFactory)], [new JsonEncoder()]);

		$json = json_decode($serializer->serialize($event->getUser(), "json", [
			"groups" => ["user"]
		]), true);

		$event->setData([
			"user" => $json,
			"token" => $event->getData()["token"],
		]);
	}

	/**
	 * Response on authentication failure.
	 * @param AuthenticationFailureEvent $event
	 */
	public function onAuthenticationFailureResponse(AuthenticationFailureEvent $event)
	{
		$response = new JWTAuthenticationFailureResponse("Authentication failed", 401);
		$event->setResponse($response);
	}
}
