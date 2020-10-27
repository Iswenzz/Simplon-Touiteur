<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201027151254 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE country (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, code INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE hashtag (id INT AUTO_INCREMENT NOT NULL, tweet_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, date DATETIME NOT NULL, INDEX IDX_5AB52A611041E39B (tweet_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE media (id INT AUTO_INCREMENT NOT NULL, author_id INT DEFAULT NULL, tweet_id INT DEFAULT NULL, url VARCHAR(255) NOT NULL, date DATETIME NOT NULL, UNIQUE INDEX UNIQ_6A2CA10CF675F31B (author_id), INDEX IDX_6A2CA10C1041E39B (tweet_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tweet (id INT AUTO_INCREMENT NOT NULL, author_id INT DEFAULT NULL, content VARCHAR(140) NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_3D660A3BF675F31B (author_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, location_id INT DEFAULT NULL, avatar_id INT DEFAULT NULL, banner_id INT DEFAULT NULL, username VARCHAR(255) NOT NULL, bio VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, birthdate DATETIME NOT NULL, created_at DATETIME NOT NULL, email VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D64964D218E (location_id), UNIQUE INDEX UNIQ_8D93D64986383B10 (avatar_id), UNIQUE INDEX UNIQ_8D93D649684EC833 (banner_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE hashtag ADD CONSTRAINT FK_5AB52A611041E39B FOREIGN KEY (tweet_id) REFERENCES tweet (id)');
        $this->addSql('ALTER TABLE media ADD CONSTRAINT FK_6A2CA10CF675F31B FOREIGN KEY (author_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE media ADD CONSTRAINT FK_6A2CA10C1041E39B FOREIGN KEY (tweet_id) REFERENCES tweet (id)');
        $this->addSql('ALTER TABLE tweet ADD CONSTRAINT FK_3D660A3BF675F31B FOREIGN KEY (author_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64964D218E FOREIGN KEY (location_id) REFERENCES country (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64986383B10 FOREIGN KEY (avatar_id) REFERENCES media (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649684EC833 FOREIGN KEY (banner_id) REFERENCES media (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64964D218E');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64986383B10');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649684EC833');
        $this->addSql('ALTER TABLE hashtag DROP FOREIGN KEY FK_5AB52A611041E39B');
        $this->addSql('ALTER TABLE media DROP FOREIGN KEY FK_6A2CA10C1041E39B');
        $this->addSql('ALTER TABLE media DROP FOREIGN KEY FK_6A2CA10CF675F31B');
        $this->addSql('ALTER TABLE tweet DROP FOREIGN KEY FK_3D660A3BF675F31B');
        $this->addSql('DROP TABLE country');
        $this->addSql('DROP TABLE hashtag');
        $this->addSql('DROP TABLE media');
        $this->addSql('DROP TABLE tweet');
        $this->addSql('DROP TABLE user');
    }
}
