<?php

namespace App\Entity;

use App\Repository\HashtagRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=HashtagRepository::class)
 */
class Hashtag
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
	 * @Groups({"hashtag"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
	 * @Groups({"hashtag"})
     */
    private $name;

    /**
     * @ORM\Column(type="datetime")
	 * @Groups({"hashtag"})
     */
    private $date;

    /**
     * @ORM\ManyToOne(targetEntity=Tweet::class, inversedBy="hashtags")
	 * @Groups({"hashtag"})
     */
    private $tweet;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

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
}
