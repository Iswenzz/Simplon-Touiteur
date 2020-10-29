<?php

namespace App\Tests;

use App\Entity\User;
use App\Entity\Tweet;
use App\Entity\Retweet;
use App\Entity\Comment;
use App\Entity\Follower;
use App\Entity\Following;
use DateTime;
use PHPUnit\Framework\TestCase;

class UserTest extends TestCase
{
    public User $user;

	public function __construct($name = null, array $data = [], $dataName = '')
	{
		parent::__construct($name, $data, $dataName);
		$this->user = new User();
	}
    
    public function testId()
	{
		$this->assertTrue(true, $this->user->getId() >= 0);
    }

    public function testBirthDate()
	{
		$this->user->setBirthDate(new DateTime("NOW"));
		$this->assertEquals(true, $this->user->getBirthDate()->getTimestamp() > 0);
    }

    public function testCreatedAt()
	{
		$this->user->setCreatedAt(new DateTime("NOW"));
		$this->assertEquals(true, $this->user->getCreatedAt()->getTimestamp() > 0);
    }

    public function testTweets()
    {
        $tweet = new Tweet();

        $this->user->addTweet($tweet);
        $this->assertEquals(true, count($this->user->getTweets()) > 0);
        $this->user->removeTweet($tweet);
        $this->assertEquals(false, count($this->user->getTweets()) > 0);
    }

    public function testName()
	{
		$this->assertTrue(true, $this->user->getName() >= 0);
    }

    public function testUsername()
	{
		$this->assertTrue(true, $this->user->getUsername() >= 0);
    }

    
    public function testRetweet()
    {
        $retweet = new Retweet();

        $this->user->addRetweet($retweet);
        $this->assertEquals(true, count($this->user->getRetweets()) > 0);
        $this->user->removeRetweet($retweet);
        $this->assertEquals(false, count($this->user->getRetweets()) > 0);
    }

    public function testBio()
	{
		$this->assertTrue(true, $this->user->getBio() >= 0);
    }

    public function testLocation()
	{
		$this->assertTrue(true, $this->user->getLocation() >= 0);
    }

    public function testComments()
    {
        $comment = new Comment();

        $this->user->addComment($comment);
        $this->assertEquals(true, count($this->user->getComments()) > 0);
        $this->user->removeComment($comment);
        $this->assertEquals(false, count($this->user->getComments()) > 0);
    }

    public function testRetweets()
    {
        $retweet = new Retweet();

        $this->user->addRetweet($retweet);
        $this->assertEquals(true, count($this->user->getRetweets()) > 0);
        $this->user->removeRetweet($retweet);
        $this->assertEquals(false, count($this->user->getRetweets()) > 0);
    }

    public function testFollowers()
    {   
        $follower = new Follower();
        
		$this->user->addFollower($follower);
        $this->assertEquals(true, count($this->user->getFollowers()) > 0);
        $this->user->removeFollower($follower);
        $this->assertEquals(false, count($this->user->getFollowers()) > 0);
    }

    public function testFollowings()
    {   
        $following = new Following();
        
		$this->user->addFollowing($following);
        $this->assertEquals(true, count($this->user->getFollowings()) > 0);
        $this->user->removeFollowing($following);
        $this->assertEquals(false, count($this->user->getFollowings()) > 0);
    }

   
    
}