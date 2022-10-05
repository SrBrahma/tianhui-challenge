import { useEffect, useRef, useState } from 'react';
import type { ButtonProps } from '@mantine/core';
import { Button, Group, Image, Paper, Text } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { IconChevronRight } from '@tabler/icons';
import type { UserDocument, UserDocuments } from '../../types/User';


export const Document = ({ document, visible = true }: {
  document: UserDocument;
  /** @default true */
  visible?: boolean;
}) => {
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

const OpenDocumentsButton = ({ onClick, ...rest }: ButtonProps & {
  // Just `ButtonProps` wasn't providing all the Buttons props.
  onClick: () => void;
}) => (
  <Button
    rightIcon={<IconChevronRight size={20}/>}
    variant='gradient'
    onClick={onClick}
    {...rest}
  >
    {'Documents'}
  </Button>
);

type DocumentsProps = {
  documents: UserDocuments;
  onOpenModalPress: () => void;
};

export const Documents = ({ documents, onOpenModalPress }: DocumentsProps) => {

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
      {!fits && <OpenDocumentsButton onClick={onOpenModalPress} style={{ position: 'absolute' }}/>}
    </Group>
  );
};