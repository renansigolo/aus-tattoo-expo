import Avatar from './avatar'
import Categories from './categories'
import CoverImage from './cover-image'
import Date from './date'
import PostTitle from './post-title'

type PostHeaderProps = {
  title: string
  coverImage: any
  date: string
  author: string
  categories: string
}

export default function PostHeader({
  title,
  coverImage,
  date,
  author,
  categories,
}: PostHeaderProps) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:mb-12 md:block">
        <Avatar author={author} />
      </div>
      <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImage title={title} coverImage={coverImage} />
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 block md:hidden">
          <Avatar author={author} />
        </div>
        <div className="mb-6 text-lg">
          Posted <Date dateString={date} />
          <Categories categories={categories} />
        </div>
      </div>
    </>
  )
}
