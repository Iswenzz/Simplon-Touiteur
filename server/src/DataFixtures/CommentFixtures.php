<?php

namespace App\DataFixtures;

use App\Entity\Comment;
use App\Entity\Tweet;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class CommentFixtures extends Fixture implements DependentFixtureInterface
{
	public const COMMENT_REFERENCE = "comment-ref";

	public function load(ObjectManager $manager): void
	{
		/**
		 * @var Tweet $tweet
		 * @var User $user
		 */
		$faker = Factory::create("en_US");
		$tweet = $this->getReference(TweetFixtures::TWEET_REFERENCE);
		$user = $this->getReference(UserFixtures::USER_REFERENCE);

		$comment = new Comment();
		$comment->setTweet($tweet);
		$comment->setDate($faker->dateTime);
		$comment->setAuthor($user);
		$comment->setContent($faker->text(100));

		$manager->persist($comment);
		$manager->flush();
		$this->addReference(self::COMMENT_REFERENCE, $comment);
	}

	public function getDependencies(): array
	{
		return [
			UserFixtures::class,
			TweetFixtures::class
		];
	}
}
