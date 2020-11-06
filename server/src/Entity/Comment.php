<?php

namespace App\Entity;

use App\Repository\CommentRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=CommentRepository::class)
 */
class Comment
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
	 * @Groups({"comment"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=140)
	 * @Groups({"comment"})
     */
    private $content;

    /**
     * @ORM\Column(type="datetime")
	 * @Groups({"comment"})
     */
    private $date;

    /**
     * @ORM\ManyToOne(targetEntity=Tweet::class, inversedBy="comments")
	 * @Groups({"comment"})
     */
    private $tweet;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="comments")
	 * @Groups({"comment"})
     */
    private $author;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

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

    public function setAuthor(?User $author): self
    {
        $this->author = $author;

        return $this;
    }
}
