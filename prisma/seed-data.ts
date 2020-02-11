import { PrismaClient } from '@prisma/client'
import { name } from 'faker'

main()

async function main() {
  const prisma = new PrismaClient()

  // create the blog
  const blog = await prisma.blog.create({
    data: {
      name: name.jobArea(),
    },
  })

  // create user
  const user = await prisma.user.create({
    data: {
      name: name.firstName(),
      rating: 0.5,
      role: 'ADMIN',
      blog: { connect: { id: blog.id } },
    },
  })

  // connect user to the blog as an author
  await prisma.blog.update({
    where: { id: blog.id },
    data: { authors: { connect: { id: blog.id } } },
  })

  console.log('added user:\n', user)
  console.log('added blog:\n', blog)
  await prisma.disconnect()
}
