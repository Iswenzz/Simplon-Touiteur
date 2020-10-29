<?php

namespace App\DataFixtures;

use App\Entity\Media;
use App\Entity\Tweet;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class MediaFixtures extends Fixture implements DependentFixtureInterface
{
	public const MEDIA_REFERENCE = "media-ref";

    public function load(ObjectManager $manager): void
    {
		/**
		 * @var Tweet $tweet
		 * @var User $user
		 */
		$faker = Factory::create("en_US");
		$tweet = $this->getReference(TweetFixtures::TWEET_REFERENCE);
		$user = $this->getReference(UserFixtures::USER_REFERENCE);

        $media = new Media();
        $media->setTweet($tweet);
        $media->setDate($faker->dateTime);
        $media->setAuthor($user);
        $media->setUrl($faker->imageUrl());

		$manager->persist($media);
		$manager->flush();
		$this->addReference(self::MEDIA_REFERENCE, $media);
    }

	public function getDependencies(): array
	{
		return [
			UserFixtures::class,
			TweetFixtures::class
		];
	}
}
