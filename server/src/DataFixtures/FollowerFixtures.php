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
		 */
		$faker = Factory::create("en_US");
		$user = $this->getReference(UserFixtures::USER_REFERENCE);

		$follower = new Follower();
		$follower->setDate($faker->dateTime);
		$follower->setUser($user);
		$follower->setFollow($user);

		$manager->persist($follower);
		$manager->flush();
		$this->addReference(self::FOLLOWER_REFERENCE, $follower);
	}

	public function getDependencies(): array
	{
		return [
			UserFixtures::class
		];
	}
}
