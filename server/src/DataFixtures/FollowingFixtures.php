<?php

namespace App\DataFixtures;

use App\Entity\Following;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class FollowingFixtures extends Fixture implements DependentFixtureInterface
{
	public const FOLLOWING_REFERENCE = "following-ref";

	public function load(ObjectManager $manager): void
	{
		/**
		 * @var User $user
		 * @var User $followingUser
		 */
		$faker = Factory::create("en_US");
		for ($i = 0; $i < 30; $i++)
		{
			$user = $this->getReference(UserFixtures::USER_REFERENCE . $i);
			$followingUser = $this->getReference(UserFixtures::USER_REFERENCE . $i);

			$following = new Following();
			$following->setFollowing($followingUser);
			$following->setDate($faker->dateTime);
			$following->setUser($user);

			$manager->persist($following);
			$this->addReference(self::FOLLOWING_REFERENCE . $i, $following);
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
