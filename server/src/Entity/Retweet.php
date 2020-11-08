<?php

namespace App\Entity;

use App\Repository\RetweetRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;

/**
 * @ORM\Entity(repositoryClass=RetweetRepository::class)
 */
class Retweet
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
	 * @Groups({"retweet"})
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
	 * @Groups({"retweet"})
     */
    private $date;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="retweets")
	 * @Groups({"retweet"})
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=Tweet::class, inversedBy="retweets")
	 * @Groups({"retweet"})
     */
    private $tweet;

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

    public function getTweet(): ?Tweet
    {
        return $this->tweet;
    }

    public function setTweet(?Tweet $tweet): self
    {
        $this->tweet = $tweet;

        return $this;
    }
}
