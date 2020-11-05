<?php

namespace App\Controller;

use App\Entity\User;
use DateTime;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * Class SecurityController
 * @package App\Controller
 * @Route("/api")
 */
class SecurityController extends AbstractController
{
	/**
	 * Register a user.
	 * @Route("/register", name="register", methods={"POST"})
	 * @param Request $request
	 * @param UserPasswordEncoderInterface $passwordEncoder
	 * @param ValidatorInterface $validator
	 * @return JsonResponse
	 */
    public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder,
							 ValidatorInterface $validator): JsonResponse
    {
        $user = new User();
		$data = json_decode($request->getContent(), true);

        if (isset($data["firstname"]) && isset($data["lastname"]) && isset($data["username"])
			&& isset($data["password"]) && isset($data["email"]))
        {
            // encode the plain password
            $user->setPassword($passwordEncoder->encodePassword($user, $data["password"]));
            $user->setName($data["firstname"] . " " . $data["lastname"]);
            $user->setBirthdate($data["birthdate"] ?? null);
            $user->setCreatedAt(new DateTime("NOW"));
            $user->setEmail($data["email"]);
            $user->setUsername($data["username"]);

            // validate
			$errors = $validator->validate($user);
			if (count($errors))
				return $this->json(["success" => false, "error" => $errors->get(0)->getMessage()]);

            $entityManager = $this->getDoctrine()->getManager();
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
	 * Log in a user.
	 * @Route("/login", name="login", methods={"POST"})
	 * @param User $user
	 * @param JWTTokenManagerInterface $JWTManager
	 * @return JsonResponse
	 */
	public function login(User $user, JWTTokenManagerInterface $JWTManager): JsonResponse
	{
		return $this->json([
			"token" => $JWTManager->create($user)
		]);
	}

	/**
	 * Check if the user connection is correctly established.
	 * @Route("/check", name="check", methods={"GET"})
	 */
	public function check()
	{
		return $this->json([
			"success" => true
		]);
	}
}
