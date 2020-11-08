<?php

namespace App\DataFixtures;

use App\Entity\Follower;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class FollowerFixtures extends Fixture implements DependentFixtureInterface
{
	public const FOLLOWER_REFERENCE = "follower-ref";

	public function load(ObjectManager $manager): void
	{
		/**
		 * @var User $user
		 * @var User $followerUser
		 */
		$faker = Factory::create("en_US");
		for ($i = 0; $i < 30; $i++)
		{
			$user = $this->getReference(UserFixtures::USER_REFERENCE . $i);
			$followerUser = $this->getReference(UserFixtures::USER_REFERENCE . $i);

			$follower = new Follower();
			$follower->setFollow($followerUser);
			$follower->setDate($faker->dateTime);
			$follower->setUser($user);

			$manager->persist($follower);
			$this->addReference(self::FOLLOWER_REFERENCE . $i, $follower);
		}
		$manager->flush();
	}

	public function getDependencies(): array
	{
		return [
			UserFixtures::class
		];
	}
}
