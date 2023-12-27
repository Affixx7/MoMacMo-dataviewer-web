import logo from "./logo.svg";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator, Button, Heading, Image, View, Card } from "@aws-amplify/ui-react";
import S3FileList from "./S3FileList";
import DataViewer from "./pages/DataViewer";
import { Box } from '@mui/system';



function App({ signOut }) {
  return (
    <View className="App">
      <Card>
        {/* <Image src={logo} className="App-logo" alt="logo" />
        <Heading level={1}>We now have Auth, very Nice!</Heading> */}
        {/* <S3FileList></S3FileList> */}
        <DataViewer></DataViewer>
      </Card>
      <Box sx={{ml:2}}><Button onClick={signOut}>Sign Out</Button></Box>
      
    </View>
  );
}

export default withAuthenticator(App);