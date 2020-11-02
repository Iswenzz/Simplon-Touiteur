<?php

namespace App\Controller;

use LogicException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class SecurityController
 * @package App\Controller
 * @Route("/api")
 */
class SecurityController extends AbstractController
{
	/**
	 * @Route("/login", name="login")
	 * @return Response
	 */
    public function login(): Response
    {
        return $this->json([
        	"success" => true
		]);
    }

    /**
     * @Route("/logout", name="logout")
     */
    public function logout()
    {
        throw new LogicException("This method can be blank - it will be intercepted by the logout key on your firewall.");
    }
}
