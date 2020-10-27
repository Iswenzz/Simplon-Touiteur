<?php

namespace App\Entity;

use App\Repository\TweetRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TweetRepository::class)
 */
class Tweet
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=140)
     */
    private $content;

    /**
     * @ORM\OneToMany(targetEntity=Media::class, mappedBy="tweet")
     */
    private $medias;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\OneToMany(targetEntity=Hashtag::class, mappedBy="tweet")
     */
    private $hashtags;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="tweets")
     */
    private $author;

    public function __construct()
    {
        $this->medias = new ArrayCollection();
        $this->hashtags = new ArrayCollection();
    }

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

    /**
     * @return Collection|Media[]
     */
    public function getMedias(): Collection
    {
        return $this->medias;
    }

    public function addMedia(Media $media): self
    {
        if (!$this->medias->contains($media)) {
            $this->medias[] = $media;
            $media->setTweet($this);
        }

        return $this;
    }

    public function removeMedia(Media $media): self
    {
        if ($this->medias->removeElement($media)) {
            // set the owning side to null (unless already changed)
            if ($media->getTweet() === $this) {
                $media->setTweet(null);
            }
        }

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * @return Collection|Hashtag[]
     */
    public function getHashtags(): Collection
    {
        return $this->hashtags;
    }

    public function addHashtag(Hashtag $hashtag): self
    {
        if (!$this->hashtags->contains($hashtag)) {
            $this->hashtags[] = $hashtag;
            $hashtag->setTweet($this);
        }

        return $this;
    }

    public function removeHashtag(Hashtag $hashtag): self
    {
        if ($this->hashtags->removeElement($hashtag)) {
            // set the owning side to null (unless already changed)
            if ($hashtag->getTweet() === $this) {
                $hashtag->setTweet(null);
            }
        }

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
