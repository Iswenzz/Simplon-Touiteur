<?php

namespace App\Entity;

use App\Repository\FollowingRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=FollowingRepository::class)
 */
class Following
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
	 * @Groups({"following"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="followings")
	 * @Groups({"following"})
     */
    private $user;

    /**
     * @ORM\OneToOne(targetEntity=User::class, cascade={"persist", "remove"})
	 * @Groups({"following"})
     */
    private $following;

    /**
     * @ORM\Column(type="datetime")
	 * @Groups({"following"})
     */
    private $date;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getFollowing(): ?User
    {
        return $this->following;
    }

    public function setFollowing(?User $following): self
    {
        $this->following = $following;

        return $this;
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
}
