<?php

namespace App\Entity;

use App\Repository\TweetRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=TweetRepository::class)
 */
class Tweet
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
	 * @Groups({"tweet", "like", "retweet", "media", "hashtag", "comment"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=140)
	 * @Groups({"tweet"})
     */
    private $content;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="tweets")
	 * @Groups({"tweet"})
     */
    private $author;

    /**
     * @ORM\Column(type="datetime")
	 * @Groups({"tweet"})
     */
    private $createdAt;

    /**
     * @ORM\OneToMany(targetEntity=Hashtag::class, mappedBy="tweet")
	 * @Groups({"tweet"})
     */
    private $hashtags;

    /**
     * @ORM\OneToMany(targetEntity=Comment::class, mappedBy="tweet")
	 * @Groups({"tweet"})
     */
    private $comments;

    /**
     * @ORM\OneToMany(targetEntity=Like::class, mappedBy="tweet")
	 * @Groups({"tweet"})
     */
    private $likes;

    /**
     * @ORM\OneToMany(targetEntity=Retweet::class, mappedBy="tweet")
	 * @Groups({"tweet"})
     */
    private $retweets;

    public function __construct()
    {
        $this->hashtags = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->likes = new ArrayCollection();
        $this->retweets = new ArrayCollection();
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

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): self
    {
        $this->author = $author;

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

    /**
     * @return Collection|Comment[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setTweet($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getTweet() === $this) {
                $comment->setTweet(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Like[]
     */
    public function getLikes(): Collection
    {
        return $this->likes;
    }

    public function addLike(Like $like): self
    {
        if (!$this->likes->contains($like)) {
            $this->likes[] = $like;
            $like->setTweet($this);
        }

        return $this;
    }

    public function removeLike(Like $like): self
    {
        if ($this->likes->removeElement($like)) {
            // set the owning side to null (unless already changed)
            if ($like->getTweet() === $this) {
                $like->setTweet(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Retweet[]
     */
    public function getRetweets(): Collection
    {
        return $this->retweets;
    }

    public function addRetweet(Retweet $retweet): self
    {
        if (!$this->retweets->contains($retweet)) {
            $this->retweets[] = $retweet;
            $retweet->setTweet($this);
        }

        return $this;
    }

    public function removeRetweet(Retweet $retweet): self
    {
        if ($this->retweets->removeElement($retweet)) {
            // set the owning side to null (unless already changed)
            if ($retweet->getTweet() === $this) {
                $retweet->setTweet(null);
            }
        }

        return $this;
    }
}
