/* eslint-disable prettier/prettier */
import * as React from 'react';
import {Header, Button, Text, Icon} from 'react-native-elements';

const MyHeader = (props) => {
  const {
    rightBtnIcon = null,
    leftBtnIcon = null,
    title = null,
    rightBtnAction = null,
    leftBtnAction = null,
  } = props;

  const leftButton = () => {
    return leftBtnIcon ? (
      <Button
        icon={<Icon name={leftBtnIcon} size={25} color="white" />}
        onPress={leftBtnAction}
      />
    ) : null;
  };

  const rightButton = () => {
    return rightBtnIcon ? (
      <Button
        icon={<Icon name={rightBtnIcon} size={25} color="white" />}
        onPress={rightBtnAction}
      />
    ) : null;
  };

  const headerTitle = (
    <Text style={{color: 'white'}} h4>
      {title}
    </Text>
  );

  return (
    <>
      <Header
        leftComponent={leftButton}
        centerComponent={headerTitle}
        rightComponent={rightButton}
      />
    </>
  );
};

export default MyHeader;
