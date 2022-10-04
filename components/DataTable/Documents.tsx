import { useEffect, useRef, useState } from 'react';
import type { ButtonProps } from '@mantine/core';
import { Button, Group, Image, Paper, Text } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { IconChevronRight } from '@tabler/icons';
import type { UserDocument, UserDocuments } from '../../types/User';


export const Document = ({ document, visible }: { document: UserDocument; visible: boolean }) => {
  const imageSize = 45;

  return (
    <Paper
      style={{
        display: 'flex',
        alignItems: 'center',
        visibility: visible ? 'visible' : 'hidden',
      }}
      withBorder
      radius='sm'
    >
      <Image
        width={imageSize}
        height={imageSize}
        src={document.image}
      />
      <Text size='md' color='blue' px='xs' align='center'>{document.name}</Text>
    </Paper>
  );
};

const OpenDocumentsButton = (props: ButtonProps) => (
  <Button
    rightIcon={<IconChevronRight size={20}/>}
    style={{ position: 'absolute' }}
    variant='gradient'
    {...props}
  >
    {'Documents'}
  </Button>
);

export const Documents = ({ documents }: { documents: UserDocuments }) => {

  const [fits, setFits] = useState(true);
  const viewPortWidth = useViewportSize().width;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // https://stackoverflow.com/a/32658882
    const elementX = ref.current?.getBoundingClientRect()?.left ?? 0;
    // Only update on valid values
    if (elementX && viewPortWidth)
      setFits(elementX < viewPortWidth);
  }, [viewPortWidth, documents]);


  return (
    <Group noWrap>
      {documents.map((document) => <Document visible={fits} key={document.id} document={document}/>)}
      <div ref={ref}/>
      {!fits && <OpenDocumentsButton/>}
    </Group>
  );
};