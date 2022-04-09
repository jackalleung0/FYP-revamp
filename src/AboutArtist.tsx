import {
  Center,
  Container,
  createStyles,
  Image,
  Title,
  Text,
  Affix,
} from "@mantine/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackIcon } from "./BackIcon";
import { CommentIcon } from "./CommentIcon";
import { ShareIcon } from "./ShareIcon";

const useStyles = createStyles((theme, _params, getRef) => ({
  ActionIcon: {
    boxShadow: theme.shadows.lg,
  },
  Image: {
    boxShadow: theme.shadows.lg,
  },
}));

export function AboutArtist() {
  const nav = useNavigate();
  const [haveInformation, setHaveInformation] = useState(true);
  return (
    <div>
      <div
        style={{
          position: "sticky",
          top: 10,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 35,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <BackIcon onClick={() => nav(-1)} />

          <ShareIcon />
        </div>
      </div>
      <Affix position={{ bottom: 0, left: 0, right: 0 }}>
        <div
          id="grad"
          style={{
            height: 114,
            background:
              "linear-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
          }}
        />
      </Affix>

      <Container
        style={{
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <Title
          style={{
            fontFamily: "Inter",
            fontSize: 13,
            fontWeight: "bold",
            lineHeight: "16px",
            height: "16px",
            color: "#4E5D78",
          }}
        >
          ARTIST PROFILE
        </Title>
        <Title
          style={{
            paddingTop: 12,
            fontFamily: "SFProDisplay",
            fontSize: 18,
            fontWeight: "bold",
            lineHeight: "28px",
            height: "21px",
            color: "#000000",
          }}
        >
          {/* Francesco Mochi */}
          Vincent van Gogh
        </Title>
        <Text
          style={{
            paddingTop: 6,

            fontSize: "14px",
            fontFamily: "Inter",
            fontWeight: "100",
            color: "#4E5D78",
            height: "17px",
            lineHeight: "20px",
          }}
        >
          {/* Italian, 1580-1654 */}
          Dutch, 1853-1890
        </Text>
        <hr
          style={{
            marginTop: 33,
            flexGrow: 1,
            border: "none",
            height: "1px",
            backgroundColor: "#F1F2F4",
          }}
        />
        {haveInformation ? (
          <Text
            style={{
              paddingTop: 24,
              fontFamily: "Inter",
              fontSize: 15,
              fontWeight: "100",
              lineHeight: "20px",
              color: "#283A5B",
              paddingBottom: 120,
            }}
          >
            During Vincent van Gogh’s tumultuous career as a painter, he created
            a revolutionary style characterized by exaggerated forms, a vivid
            color palette, and loose, spontaneous handling of paint. Although he
            only actively pursued his art for five years before his death in
            1890, his impact has lived on through his works. In 1886 Van Gogh
            left his native Holland and settled in Paris, where his beloved
            brother, Theo, was a paintings dealer. In the two years he spent in
            Paris, Van Gogh painted no fewer than two dozen self-portraits. The
            Art Institute’s early, modestly sized example displays the bright
            palette he adopted with an overlay of small, even brushstrokes, a
            response to the Pointillist technique Georges Seurat used, most
            notably in A Sunday on La Grande Jatte—1884. Works such as Fishing
            in Spring, the Pont de Clichy (Asnières); Grapes, Lemons, Pears, and
            Apples; and Cypresses show the influence of the Impressionists.
            Exhausted with the Parisian city life, Van Gogh moved on to the town
            of Arles in 1888. It was here that he created compositions of such
            personal importance that he repeated them several times, such as The
            Bedroom and Madame Roulin Rocking the Cradle (La berceuse), with
            slight variations on each repetition. After experiencing several
            bouts of mental illness, at the time diagnosed as epilepsy, Van Gogh
            was admitted to the Asylum of Saint Paul in Saint-Rémy. There he
            sketched and painted the grounds of the asylum and the town around
            him. On days when he was unable to go out, he copied works by other
            artists, such as The Drinkers, after a wood engraving of the same
            title by Honoré Daumier. Van Gogh spent the last few months of his
            life in Auvers-sur-Oise, a small town to the north of Paris. Here,
            he continued drawing and painting the town and those around him,
            capturing people, landscapes, houses, and flowers in his work until
            his untimely death. The Art Institute of Chicago has celebrated van
            Gogh’s path-breaking work in the exhibitions Van Gogh and Gauguin:
            The Studio of the South (2001–2002) and Van Gogh’s Bedrooms (2016).
          </Text>
        ) : (
          <div
            style={{
              paddingTop: 144,
              paddingBottom: 256,
              width: 205,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <NoInformationIcon style={{ margin: "0 auto" }} />
            <Text
              style={{
                paddingTop: 36,
                fontFamily: "Inter",
                fontSize: 16,
                fontWeight: "100",
                color: "#8A94A6",
                lineHeight: "20px",
              }}
              align="center"
            >
              No further information
              <br />
              can be provided now.
            </Text>
          </div>
        )}
      </Container>
    </div>
  );
}

const NoInformationIcon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="83"
    height="115"
    viewBox="0 0 83 115"
    {...props}
  >
    <path
      id="No_Content_Icon"
      d="M17.833,2A14.112,14.112,0,0,0,4,16.375v86.25A14.112,14.112,0,0,0,17.833,117H73.167A14.112,14.112,0,0,0,87,102.625V40.913a14.664,14.664,0,0,0-4.051-10.161L59.333,6.212A13.574,13.574,0,0,0,49.553,2ZM24.75,59.5a7.193,7.193,0,0,0,0,14.375h41.5a7.193,7.193,0,0,0,0-14.375Z"
      transform="translate(-4 -2)"
      fill-rule="evenodd"
    />
  </svg>
);
