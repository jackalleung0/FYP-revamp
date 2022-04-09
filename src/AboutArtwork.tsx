import {
  Center,
  Container,
  createStyles,
  Image,
  Title,
  Text,
  Affix,
} from "@mantine/core";
import React from "react";
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

const titlePadd = 20;
const hrmarg = 32;
export function AboutArtwork() {
  const { classes } = useStyles();
  const nav = useNavigate();
  return (
    <div>
      <div
        style={{
          position: "sticky",
          top: 10,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 34,
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
      <Center style={{ backgroundColor: "#F1F2F4" }}>
        <Image
          width={335}
          height={228}
          withPlaceholder
          className={classes.Image}
          style={{ margin: "36px 40px" }}
          src="https://picsum.photos/1200"
        />
      </Center>
      <Container
        style={{
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <Title
          style={{
            paddingTop: 33,
            fontFamily: "Inter",
            fontSize: 13,
            fontWeight: "bold",
            lineHeight: "16px",
            height: "16px",
            color: "#4E5D78",
          }}
        >
          ABOUT ARTWORK
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
          Artwork Details
        </Title>
        <Text
          style={{
            paddingTop: 27,
            fontFamily: "Inter",
            fontSize: 15,
            fontWeight: "100",
            lineHeight: "20px",
            color: "#283A5B",
          }}
        >
          Vincent van Gogh so highly esteemed his bedroom painting that he made
          three distinct versions: the first, now in the collection of the Van
          Gogh Museum, Amsterdam; the second, belonging to the Art Institute of
          Chicago, painted a year later on the same scale and almost identical;
          and a third, smaller canvas in the collection of the Musée d’Orsay,
          Paris, which he made as a gift for his mother and sister. Van Gogh
          conceived the first Bedroom in October 1888, a month after he moved
          into his “Yellow House” in Arles, France. This moment marked the first
          time the artist had a home of his own, and he had immediately and
          enthusiastically set about decorating, painting a suite of canvases to
          fill the walls. Completely exhausted from the effort, he spent
          two-and-a-half days in bed and was then inspired to create a painting
          of his bedroom. As he wrote to his brother Theo, “It amused me
          enormously doing this bare interior. With a simplicity à la Seurat. In
          ﬂat tints, but coarsely brushed in full impasto, the walls pale lilac,
          the ﬂoor in a broken and faded red, the chairs and the bed chrome
          yellow, the pillows and the sheet very pale lemon green, the bedspread
          blood-red, the dressing-table orange, the washbasin blue, the window
          green. I had wished to express utter repose with all these very
          different tones.” Although the picture symbolized relaxation and peace
          to the artist, to our eyes the canvas seems to teem with nervous
          energy, instability, and turmoil, an effect heightened by the sharply
          receding perspective.
        </Text>
        <hr
          style={{
            marginTop: hrmarg,
            flexGrow: 1,
            border: "none",
            height: "1px",
            backgroundColor: "#F1F2F4",
          }}
        />
      </Container>
      <Container
        style={{
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <Title
          style={{
            paddingTop: titlePadd,
            fontFamily: "SFProDisplay",
            fontSize: 18,
            fontWeight: "bold",
            lineHeight: "28px",
            height: "21px",
            color: "#000000",
          }}
        >
          Publication History
        </Title>
        <Text
          style={{
            paddingTop: 27,
            fontFamily: "Inter",
            fontSize: 15,
            fontWeight: "100",
            lineHeight: "20px",
            color: "#283A5B",
          }}
        >
          Minneapolis Institute of Arts, "Exhibition of French Paintings from a
          Well-Known Collection," Bulletin of the Minneapolis Institute of Arts,
          14, 4 (April 1925), 31–32. Forbes Watson, "A Note on the Birch
          Bartlett Collection," The Arts 9, no. 6 (June 1926): 303–06 (ill.),
          307–13. R.M.F., “Van Gogh in Arles,” Bulletin of the Art Institute of
          Chicago 20, no. 7, (October 1926): 92–94. Museo del Palacio de Bellas
          Artes, Rojo mexicano: la grana cochinilla en el arte, exh. cat.
          (Ciudad de Mexico: Instituto Nacional de Bellas Artes, 2017), 270, 387
          fig. 61. Art Institute of Chicago Annual Report (Chicago: Art
          Institute of Chicago, 1926), 54 (ill.). J[acob]-B[aart] de la Faille,
          L'Oeuvre de Vincent van Gogh: catalogue raisonné (Berlin: G. van
          Ouest, 1928), vol. 1, 138, no. 484; vol. 2, pl. 134. Art Institute of
          Chicago, Modern Paintings in the Helen Birch Bartlett Memorial from
          the Birch-Bartlett Collection (Chicago: Art Institute of Chicago,
          1929), 22–23. Vincent van Gogh, Further Letters to His Brother,
          1886–1889 (London: Constable and Co., 1929), 234–35, 280, 371–72. Art
          Institute of Chicago, A Guide to the Paintings in the Permanent
          Collection (Chicago: Art Institute of Chicago, 1932), 27 (ill.). Art
          Institute of Chicago, A Brief Guide to the Collections (Chicago: Art
          Institute of Chicago, 1935), 30 (ill.), 31. W. Scherjon and Jos. de
          Gruyter, Vincent van Gogh's Great Period: Arles, St. Rémy and Auvers
          sur Oise (Complete Catalog) (Amsterdam: De Spieghel, 1937), 140
          (ill.), no. 12. J[acob]-B[aart] de la Faille, Vincent van Gogh, trans.
          Prudence Montagu-Pollock (New York: French and European Publications;
          Paris: Hyperion, 1938), 362 (ill.), no. 510. Art Institute of Chicago,
          Masterpiece of the Month, Notes and Bibliography (Chicago: Art
          Institute of Chicago, 1938), 18–19 (ill.). Art Institute of Chicago, A
          Brief Guide to the Collections (Chicago: Art Institute of Chicago,
          1941), 36 (ill.), 37. Art Institute of Chicago, A Brief Guide to the
          Collections (Chicago: Art Institute of Chicago, 1945), 40 (ill.). Art
          Institute of Chicago, Modern Paintings in the Helen Birch Bartlett
          Memorial from the Birch-Bartlett Collection (Chicago: Art Institute of
          Chicago, 1946), 18–19 (ill.). Louis Hautecoeur, Van Gogh (Monaco: Les
          Documents d'Art, 1946), 78, 144. Egbert Jacobson, Basic Color (Paul
          Theobald, 1948),174–76 (ill.). Art Institute of Chicago, A Brief Guide
          to the Collections (Chicago: Art Institute of Chicago, 1948), p. 37
          (ill.). Meyer Schapiro, Vincent van Gogh, The Library of Great
          Painters (New York: Harry N. Abrams, 1950), 78–79 (ill.). Charles
          Fabens Kelley, “Chicago: record years,” Art News 51, no. 4
          (June–August 1952): 52–65, 106–08, 109 (ill.), 110–11. Lawrence and
          Elisabeth Hanson, Passionate Pilgrim: The Life of Vincent Van Gogh
          (New York: Random House, 1955), 209–10. Art Institute of Chicago, A
          Brief Guide to the Collections (Chicago: Art Institute of Chicago,
          1956), 36 (ill.). Art Institute of Chicago, Paintings in the Art
          Institute of Chicago: A Catalogue of the Picture Collection (Chicago:
          Art Institute of Chicago, 1961), 198, 328 (ill.). Frederick A. Sweet,
          “Great Chicago Collectors,” Apollo 84 (September 1966): 194, fig. 16,
          197. Jacob-Baart de la Faille, The Works of Vincent van Gogh, His
          Paintings and Drawings (New York: Reynal, 1970), 284 (ill), 285, no.
          F484. John Maxon, The Art Institute of Chicago (New York: Harry N.
          Abrams, 1970), 93 (ill.), 94 [repr. 1977, 1987]. Paolo Lecaldano, Tout
          l'oeuvre peint de Van Gogh, vol. 2: 1888–1890, trans. Simone Darses,
          vol. 2 (Paris: Flammarion, 1971), 220 (ill.), 221, no. 690. Katharine
          Kuh, “These Are A Few of My Favorite Things,” Chicago Tribune
          Magazine, April 23, 1972, 32. Mike Samuels, M.D. and Nancy Samuels,
          Seeing with the Mind’s Eye: The History, Techniques and Uses of
          Visualization (New York: Random House, 1975), 76, pl. 2. John L. Word,
          “A Reexamination of Van Gogh’s Pictorial Space,” The Art Bulletin 58,
          no. 4 (December 1976): 593–604. Guy Hubbard and Mary J. Rouse, ART:
          Discovering and Creating (Westchester, IL: Benefic Press, 1977), 102
          (ill.). Paolo Lecaldano, L’opera pittorica completa di Van Gogh, vol.
          2 (Milan: Rizzoli Editore, 1977), 220 (ill.), 221, no. 690. Janice
          Feldstein and Maureen Smith, The Art Institute of Chicago: 100
          Masterpieces (Chicago: Art Institute of Chicago; distributed by Rand
          McNally, 1978), 116–17 (color ill.), no. 69. Robert H. Pelfrey and
          Mary Hall-Pelfrey, Art and Mass Media (New York: Harper & Row, 1985),
          126 pl. 18, 182–83 fig. 7.23), 184. Peter C. Sutton, A Guide to Dutch
          Art in America (Washington, D.C.: Netherlands-American Amity Trust;
          Grand Rapids: Eerdmans, 1986), 54 fig. 77. Richard R. Brettell, “The
          Bartletts and the ‘Grande Jatte’: Collecting Modern Painting in the
          1920s,” Art Institute of Chicago Museum Studies 12, no. 2 (1986): 105,
          111. Richard R. Brettell, “Van Gogh’s Bedroom at Arles: the Problem of
          Priority,” Art Institute of Chicago Museum Studies 12, 2 (1986): pp.
          136–37 (ill.), 138–51. James N. Wood and Katharine C. Lee, eds.,
          Master Paintings in The Art Institute of Chicago (Chicago Art
          Institute of Chicago, 1988), 65 (ill.). Walter Feilchendeldt, Vincent
          van Gogh and Paul Cassirer, Berlin: the reception of Van Gogh in
          Germany from 1901 to 1914 (Zwolle: Van Gogh Museum, 1988), 98 (ill.).
          Jan Hulsker, “Bedroom Problems,” Simiolus, 18, 4 (1988): 257–59
          (ill.), 260–61. Ingo F. Walther and Rainer Metzger, Vincent Van Gogh
          Sämtliche Gemälde (Cologne: Benedikt Taschen Verlag, 1989), 441, 442,
          548, 549 (color ill.). Gene A. Mittler, Art in Focus (New York:
          Glencoe Publishing Company, 1989), p. 319, fig. 17.6. Richard Thomson,
          “State of the Art Van Gogh,” Apollo 132, no. 341(July 1990): 41 fig.
          14, 42. “Vincent van Gogh Retrospective Exhibition,” Van Gogh Bulletin
          5, no. 1 (1990): 5 (color ill.), 6. Jan Hulsker, The New Complete Van
          Gogh, Enlarged Edition of the Catalogue Raisonné of the Works of
          Vincent van Gogh (Aldershot, England; Burlington, VT: J.M. Meulenhoff;
          Philadelphia: John Benjamins Pub. Co., 1996), 404-09 no. 1771,
          496n1771. Mark Rosenthal, The Robert and Jane Meyerhoff Collection,
          1945 to 1995, exh. cat. (Washington, D.C., National Gallery of Art,
          1996), 123–29 fig. 11. Sculpture Foundation, Solid Impressions: J.
          Seward Johnson, Jr. (Hamilton, NJ: The Sculpture Foundation, 2002), 26
          (color ill.), 27–29. Petra ten-Doesschate Chu, "The Reality of
          Illusion, The Illusion of Reality," in Beyond the Frame: Impressionism
          Revisited: The Sculptures of J. Seward Johnson, Jr., exh. cat.
          (Boston: Bulfinch Press; Washington, D.C.: In association with the
          Corcoran Gallery of Art, 2003), 11 (color ill.), 12, 15–18. Richard R.
          Brettell, "A View from Portland: 110 Years of Modern French Art in
          Portland," in Paris to Portland: Impressionist and Post Impressionist
          Masters in Portland Collections, exh. cat. (Portland: Portland Art
          Museum, 2003), p. 33, fig. 3. Kimberly A. Smith, Between Ruin and
          Renewal: Egon Schiele's Landscapes (New Haven: Yale University Press,
          2004), 30 fig. 15, 31. Katharine Kuh, My Love Affair with Modern Art:
          Behind the Scenes with a Legendary Curator (New York: Arcade
          Publishing, 2006), 52–53 (ill.), 91–94. Jill Lloyd, Vincent van Gogh
          and Expressionism, exh. cat. (Ostfildern: Hatje Cantz Verlag;
          Amsterdam: Van Gogh Museum, 2006), 115–16, 122 (color ill.), 123–24.
          Tsukasa Kodera, Vincent Willem van Gogh (Tokyo: Shogakukan, 2006), 16
          (color ill.). Leo Jansen, Hans Luijten, and Nienke Bakker, eds.,
          Vincent van Gogh, The Letters: The Complete Illustrated and Annotated
          Edition, vol 5: Saint-Rémy-de-Provence - Auvers-sur-Oise, 1889–1890
          (Amsterdam: Van Gogh Museum; The Hague: Huygens Institute; Brussels:
          Mercatorfonds, 2009), 79 fig. 2, 80–88. Marika Spring, Helen Howard,
          Jo Kirby, Joseph Padfield, David Peggie, Ashok Roy, and Anne
          Stephenson-Wright, Studying Old Master Paintings: Technology and
          Practice (London: Archetype Publications: In association with the
          National Gallery, 2011), 237–38 fig. 2, 239–43. Walter Feilchenfeldt,
          Vincent van Gogh: Die Gemälde 1886–1890 Händler, Sammler,
          Ausstellungen Die Frühen Provenienzen (Wädenswil, Switzerland: Nimbus,
          Kunst und Bücher, 2009), 118 (color ill.). Walter Feilchendeldt,
          Vincent van Gogh: The years in France, Complete paintings 1886-1890.
          Dealers, collectors, exhibitions, provenance (London: Philip Wilson,
          2013), 120 (color ill.). William Rathbone, Marcia Steele, H. Travers
          Newton, and Galina K. Olmsted, "The Bedroom," Van Gogh Repetitions,
          exh. cat. (The Phillips Collection/The Cleveland Museum of Art, 2013),
          pp. 82 (color ill.), 83–89, fig. 38. Gloria Groom, ed., Van Gogh's
          Bedrooms, exh. cat. (New Haven and London: Art Institute of Chicago,
          Yale University Press, 2016), plate 26.
        </Text>
        <hr
          style={{
            marginTop: hrmarg,
            flexGrow: 1,
            border: "none",
            height: "1px",
            backgroundColor: "#F1F2F4",
          }}
        />
      </Container>
      <Container
        style={{
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <Title
          style={{
            paddingTop: titlePadd,
            fontFamily: "SFProDisplay",
            fontSize: 18,
            fontWeight: "bold",
            lineHeight: "28px",
            height: "21px",
            color: "#000000",
          }}
        >
          Provenance
        </Title>
        <Text
          style={{
            paddingTop: 24,
            fontFamily: "Inter",
            fontSize: 15,
            fontWeight: "100",
            lineHeight: "20px",
            color: "#283A5B",
          }}
        >
          The artist; sent to his brother, Theo van Gogh (died 1891), Paris,
          Dec. 18, 1889 [Letter 829 from Vincent van Gogh to Theo van Gogh, Dec.
          19, 1889, notes that The Bedroom was sent the day before]; by descent
          to Johanna van Gogh-Bonger (died 1925), the Netherlands, 1891; sold to
          Jos Hessel, Paris, by 1901 [Paris 1901]. Carl Reininghaus, Vienna, by
          1909, to at least 1914 [Vienna 1909; Berlin 1914]. Paul Rosenberg,
          Paris and New York, by 1926; sold to Frederic Clay Bartlett, Chicago,
          Dec. 1926 [receipt and correspondence in curatorial object file];
          given to the Art Institute of Chicago, 1926.
        </Text>
        <hr
          style={{
            marginTop: hrmarg,
            flexGrow: 1,
            border: "none",
            height: "1px",
            backgroundColor: "#F1F2F4",
          }}
        />
      </Container>
      <Container
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 120,
        }}
      >
        <Title
          style={{
            paddingTop: titlePadd,
            fontFamily: "SFProDisplay",
            fontSize: 18,
            fontWeight: "bold",
            lineHeight: "28px",
            height: "21px",
            color: "#000000",
          }}
        >
          Exhibition History
        </Title>
        <Text
          style={{
            paddingTop: 24,
            fontFamily: "Inter",
            fontSize: 15,
            fontWeight: "100",
            lineHeight: "20px",
            color: "#283A5B",
          }}
        >
          Paris, Galerie Vollard, 1895, no cat. Paris, Galerie Bernheim-Jeune,
          Vincent van Gogh, Mar. 15–31, 1901, cat. 19, as La Chambre de Vincent
          à Arles. Vienna Secession, Internationalen Kunstschau, May–Oct. 1909,
          room 14, cat. 1, as Das Schlafzimmer. Berlin, Paul Cassirer, Zehnte
          Ausstellung: Vincent van Gogh: 30 März 1853–29 Juli 1890, May–June
          1914, cat. 53, as Das Schlafzimmer. New York, Museum of Modern Art,
          First Loan Exhibition: Cézanne, Gauguin, Seurat, Van Gogh, Nov. 8–Dec.
          7, 1929, cat. 79, as Van Gogh's Room at Arles (La Chambre à Arles).
          Art Institute of Chicago, A Century of Progress, June 1–Nov. 1, 1933,
          cat. 376. Art Institute of Chicago, A Century of Progress, June 1–Nov.
          1, 1934, cat. 310. Toledo Museum of Art, French Impressionists and
          Post Impressionists, Nov. 1934, cat. 24. Art Institute of Chicago,
          Paintings and Drawings by Vincent van Gogh, lent through the Museum of
          Modern Art, N.Y., Aug. 26–Sep. 23, 1936, no cat. Amsterdam, Van Gogh
          Museum, Vincent van Gogh Paintings, Mar. 30–July 29, 1990, cat. 7.
          Essen, Museum Folkwang, Vincent van Gogh und die Moderne 1890–1914,
          Aug. 11–Nov. 4, 1990, cat. 40, as Das Schlafzimmer; Amsterdam, Van
          Gogh Museum, Nov. 16, 1990–Feb. 18, 1991. Art Institute of Chicago,
          Van Gogh and Gauguin: The Studio of the South, Sep. 22, 2001–Jan. 13,
          2002, cat. 120. Amsterdam, Van Gogh Museum, Van Gogh and
          Expressionism, Nov. 24, 2006-Mar. 2, 2007; New York, Neue Gallery,
          Mar. 23-July 2, 2007 [New York only]. Fort Worth, TX, Kimbell Museum
          of Art, The Impressionists: Master Paintings from the Art Institute of
          Chicago, June 29–Nov. 2, 2008, cat. 58. Amsterdam, Van Gogh Museum,
          Van Gogh at Work, Sep. 1, 2013 - Jan. 13, 2014, cat. 266. Art
          Institute of Chicago, Van Gogh’s Bedrooms, Feb. 14–May 10, 2016, no
          cat. no., plate 26.
        </Text>
        <hr
          style={{
            marginTop: hrmarg,
            flexGrow: 1,
            border: "none",
            height: "1px",
            backgroundColor: "#F1F2F4",
          }}
        />
      </Container>
    </div>
  );
}
