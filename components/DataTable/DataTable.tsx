import { useMemo } from 'react';
import { Table } from '@mantine/core';
import type { Users } from '../../types/User';
import { Documents } from './Documents';


export function DataTable({ users }: {users: Users}): JSX.Element {

  // const [data, setData] = useState(() => generateData({ number: 4 }));

  // useMemo here would break the element position getter.
  const rows = useMemo(() =>
    users.map((user) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.jobType}</td>
        <td>{user.salary}</td>
        <td><Documents documents={user.documents}/></td>
      </tr>
    ))
  , [users]);

  return (
    <Table highlightOnHover width='100vw' fontSize='md'>
      <thead>
        <tr>
          <th>{'Name'}</th>
          <th>{'Job Type'}</th>
          <th>{'Salary'}</th>
          <th>{'Documents'}</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}