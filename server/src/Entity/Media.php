<?php

namespace App\Entity;

use App\Repository\MediaRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=MediaRepository::class)
 */
class Media
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
	 * @Groups({"media"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
	 * @Groups({"media"})
     */
    private $url;

    /**
     * @ORM\Column(type="datetime")
	 * @Groups({"media"})
     */
    private $date;

    /**
     * @ORM\OneToOne(targetEntity=Tweet::class, cascade={"persist", "remove"})
	 * @Groups({"media"})
     */
    private $tweet;

    /**
     * @ORM\OneToOne(targetEntity=User::class, cascade={"persist", "remove"})
	 * @Groups({"media"})
     */
    private $author;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): self
    {
        $this->url = $url;

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

    public function getTweet(): ?Tweet
    {
        return $this->tweet;
    }

    public function setTweet(?Tweet $tweet): self
    {
        $this->tweet = $tweet;

        return $this;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $user): self
    {
        $this->author = $user;

        return $this;
    }
}
