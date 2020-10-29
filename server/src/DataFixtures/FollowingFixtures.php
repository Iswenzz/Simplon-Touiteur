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
		 */
		$faker = Factory::create("en_US");
		$user = $this->getReference(UserFixtures::USER_REFERENCE);

		$following = new Following();
		$following->setDate($faker->dateTime);
		$following->setUser($user);
		$following->setFollowing($user);

		$manager->persist($following);
		$manager->flush();
		$this->addReference(self::FOLLOWING_REFERENCE, $following);
	}

	public function getDependencies(): array
	{
		return [
			UserFixtures::class
		];
	}
}
