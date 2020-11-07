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
		for ($i = 0; $i < 30; $i++)
		{
			$tweet = $this->getReference(TweetFixtures::TWEET_REFERENCE . $i);
			for ($j = 0; $j < 10; $j++)
			{
				$user = $this->getReference(UserFixtures::USER_REFERENCE . rand(0, 29));

				$comment = new Comment();
				$comment->setTweet($tweet);
				$comment->setDate($faker->dateTime);
				$comment->setAuthor($user);
				$comment->setContent($faker->realText(100));

				$manager->persist($comment);
				$this->addReference(self::COMMENT_REFERENCE . $i . $j, $comment);
			}
		}
		$manager->flush();
	}

	public function getDependencies(): array
	{
		return [
			UserFixtures::class,
			TweetFixtures::class
		];
	}
}
