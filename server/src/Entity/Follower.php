<?php

namespace App\Entity;

use App\Repository\FollowerRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=FollowerRepository::class)
 */
class Follower
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
	 * @Groups({"follower"})
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
	 * @Groups({"follower"})
     */
    private $date;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="followers")
	 * @Groups({"follower"})
     */
    private $user;

    /**
     * @ORM\OneToOne(targetEntity=User::class, cascade={"persist", "remove"})
	 * @Groups({"follower"})
     */
    private $follow;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getFollow(): ?User
    {
        return $this->follow;
    }

    public function setFollow(?User $follow): self
    {
        $this->follow = $follow;

        return $this;
    }
}
