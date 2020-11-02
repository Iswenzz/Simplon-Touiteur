<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Security\LoginFromAuthenticator;
use App\Security\TokenAuthenticator;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Guard\GuardAuthenticatorHandler;
use Symfony\Component\Validator\Constraints\Date;

/**
 * Class RegistrationController
 * @package App\Controller
 * @Route("/api")
 */
class RegistrationController extends AbstractController
{
	/**
	 * @Route("/register", name="register")
	 * @param Request $request
	 * @param UserPasswordEncoderInterface $passwordEncoder
	 * @param GuardAuthenticatorHandler $guardHandler
	 * @param TokenAuthenticator $authenticator
	 * @return Response
	 */
    public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder,
		GuardAuthenticatorHandler $guardHandler, TokenAuthenticator $authenticator): Response
    {
        $user = new User();
		$data = json_decode($request->getContent(), true);

        if (isset($data["firstname"]) && isset($data["lastname"]) && isset($data["username"])
			&& isset($data["password"]) && isset($data["email"]))
        {
            // encode the plain password
            $user->setPassword(
                $passwordEncoder->encodePassword(
                    $user,
                    $data["password"]
                )
            );

            $user->setName($data["firstname"] . " " . $data["lastname"]);
            $user->setBirthdate($data["birthdate"] ?? null);
            $user->setCreatedAt(new DateTime("NOW"));
            $user->setEmail($data["email"]);
            $user->setUsername($data["username"]);

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();

            return $guardHandler->authenticateUserAndHandleSuccess(
                $user,
                $request,
                $authenticator,
                "main" // firewall name in security.yaml
            );
        }
        return $this->json([
        	"success" => false
		], 400);
    }
}
