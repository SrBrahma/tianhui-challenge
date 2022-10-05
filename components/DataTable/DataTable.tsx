import React, { useEffect, useMemo, useState } from 'react';
import { Modal, ScrollArea, Stack, Table, Title } from '@mantine/core';
import { cloneDeep } from 'lodash';
import type { User, Users } from '../../types/User';
import { Document, Documents } from './Documents';


export function DataTable({ users }: { users: Users }): JSX.Element {

  const [selectedUidDocuments, setSelectedUidDocuments] = useState<string | null>(null);

  const selectedUserDocuments = useMemo<User | null>(() => (
    (selectedUidDocuments && users.find((user) => user.id === selectedUidDocuments)) || null
  ), [selectedUidDocuments, users]);

  // Reset selected uid if user not found.
  useEffect(() => {
    if (!selectedUserDocuments)
      setSelectedUidDocuments(null);
  }, [selectedUserDocuments]);

  const rows = useMemo(() =>
    users.map((user) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.jobType}</td>
        <td>{user.salary}</td>
        <td>
          <Documents documents={user.documents} onOpenModalPress={() => setSelectedUidDocuments(user.id)}/>
        </td>
      </tr>
    ))
  , [users]);

  return (
    <>
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
      <DocsModal user={selectedUserDocuments} onClose={setSelectedUidDocuments}/>
    </>
  );
}


/** https://blog.hackages.io/conditionally-wrap-an-element-in-react-a8b9a47fab2 */
const ConditionalWrapper = ({ condition, wrapper, children }: {
  wrapper: (children: JSX.Element) => JSX.Element;
  condition: boolean;
  children: JSX.Element;
}) =>
  (condition ? wrapper(children) : children);

const DocsModal = React.memo(({ user: userProp, onClose }: {
  user: User | null;
  /** Has null as argument to reset selection */
  onClose: (v: null) => void;
}) => {
  // Keep data while closing Modal
  const [clonedUser, setClonedUser] = useState<User | null>(null);
  useEffect(() => {
    if (userProp) setClonedUser(cloneDeep(userProp));
  }, [userProp]);
  const user = userProp ?? clonedUser;

  const nameWithApostrophe = useMemo(() =>
    ((user?.name.endsWith('s')) ? `${user.name}'` : `${user?.name}'s`)
  , [user?.name]);


  return (
    <Modal opened={!!userProp} onClose={() => onClose(null)}>
      <Title order={2} pb='lg'>{`${nameWithApostrophe} Documents`}</Title>
      <ConditionalWrapper
        condition={(user?.documents.length ?? 0) > 4}
        wrapper={(children) => <ScrollArea style={{ height: 250 }} type='auto'>{children}</ScrollArea>}
      >
        <Stack>
          {user?.documents.map(
            (document) => <Document key={document.id} document={document}/>,
          )}
        </Stack>

      </ConditionalWrapper>
    </Modal>
  );
});