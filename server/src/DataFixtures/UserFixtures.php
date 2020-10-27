<?php

namespace App\DataFixtures;

use App\Entity\Country;
use App\Entity\Media;
use App\Entity\Tweet;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class UserFixtures extends Fixture
{
	public const USER_REFERENCE = "user-ref";

    public function load(ObjectManager $manager)
    {
		/**
		 * @var Country $country
		 * @var Tweet $tweet
		 */
		$faker = Factory::create("en_US");
        $user = new User();
        $country = $this->getReference(CountryFixtures::COUNTRY_REFERENCE);
        $tweet = $this->getReference(TweetFixtures::TWEET_REFERENCE);

        // Media
		$media = new Media();
		$media->setTweet($tweet);
		$media->setDate($faker->dateTime);
		$media->setAuthor($user);
		$media->setUrl($faker->imageUrl());

		// User
        $user->setLocation($country);
        $user->setName($faker->name);
        $user->setBio($faker->text);
        $user->setCreatedAt($faker->dateTime);
        $user->setBirthdate($faker->dateTime);
        $user->setEmail($faker->email);
        $user->setUsername($faker->userName);
        $user->setAvatar($media);
        $user->setBanner($media);

		$manager->persist($user);
        $manager->flush();
		$this->addReference(self::USER_REFERENCE, $user);
    }
}
