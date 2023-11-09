import './App.css'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from './components/ui/button'
import useSWR from 'swr'
import axios from 'axios'
import { useState } from 'react'

const URL = import.meta.env.PROD ? '/api/users' : 'http://localhost:3001/api/users'

const fetcher = (url: string) => axios(url).then((res) => res.data)

type User = {
  id: string
  username: string
}

function App() {
  const [inputVal, setInputVal] = useState('')
  const { data, mutate } = useSWR<User[]>(URL, fetcher)

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    await axios.post(URL, { username: inputVal })
    setInputVal('')
    mutate()
  }
  return (
    <div>
      <form className="mb-4" onSubmit={onSubmit}>
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Username"
            required
            value={inputVal}
            onChange={(ev) => setInputVal(ev.target.value)}
          />
          <Button type="submit">Add</Button>
        </div>
      </form>
      <Table>
        <TableCaption>A list of username from database</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Username</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium text-left">{item.id}</TableCell>
              <TableCell className="text-left">{item.username}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default App
