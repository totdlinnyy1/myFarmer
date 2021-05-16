import Link from 'next/link'
import {FC} from 'react'
import {Avatar, Box, Button, Flex, HStack, VStack, Text} from '@chakra-ui/react'

interface ProfileProps {
  name: string
  lastname: string
  avatar: string | null
  role: string
  number: string
}

const ProfileComponent: FC<ProfileProps> = ({
  name,
  lastname,
  avatar,
  role,
  number,
}) => {
  return (
    <Flex>
      <Box mr={5}>
        <Box mb={3}>
          <Avatar
            name={`${name} ${lastname}`}
            url={avatar}
            borderRadius='0'
            w='200px'
            h='300px'
            loading='lazy'
            bg='pink'
          />
        </Box>
        <Box>
          <Link href='/profile/edit'>
            <a>
              <Button size='lg' w='200px'>
                Изменить
              </Button>
            </a>
          </Link>
        </Box>
      </Box>
      <VStack justify='space-between' align='start'>
        <Box>
          <Box>
            <Text fontSize='2xl'>{`${name} ${lastname}`}</Text>
          </Box>
          <Box>
            <Text>Роль: {role}</Text>
          </Box>
          <Box>
            <Text>Номер телефона: +7{number}</Text>
          </Box>
        </Box>
        <Box>
          <HStack spacing='20px'>
            <Box textAlign='center'>
              <Text fontSize='2xl' color='red'>
                0
              </Text>
              <Text>товаров</Text>
            </Box>
            <Box textAlign='center'>
              <Text fontSize='2xl' color='red'>
                0
              </Text>
              <Text>товаров на карте</Text>
            </Box>
            <Box textAlign='center'>
              <Text fontSize='2xl' color='red'>
                0
              </Text>
              <Text>отзывов</Text>
            </Box>
            <Box textAlign='center'>
              <Text fontSize='2xl' color='red'>
                0
              </Text>
              <Text>ваш рейтиг</Text>
            </Box>
          </HStack>
        </Box>
      </VStack>
    </Flex>
  )
}

export default ProfileComponent
