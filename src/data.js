const initialCatalogues = [
  {
    id: "furniture",
    title: "Antique Furniture",
    description:
      "This extraordinary collection of antique furniture pieces includes rare cabinets dating 17th-century, 19th-century tables and chairs as well as 18th-century French furniture, English oak rarities, and American masterworks.",
    products: [
      {
        title: "Francois Linke Side Table",
        description:
          "This enchanting and rare side table was crafted by the famous François Linke. Crafted of luxurious satinwood, the table incorporates elegant Wedgwood jasper cameo plaques. Linke's trademark gilt bronze mounts complete this enchanting design.",
        price: "$2,500",
        image: "/images/table.jpg",
        id: 0
      },
      {
        title: "Korean Drawer Apothecary Accent Chest",
        description:
          "Traditional oriental 18 drawer apothecary chest. Richly grained dark walnut stained wood finish. Elegant Asian style brass butterfly hasp & hardware. Korean design Tori gate style cantilevered top.",
        price: "$3,250",
        image: "/images/drawer.jpg",
        id: 1
      },
      {
        title: "19th Century Biedermeier Globe Table",
        description:
          "Elm, cherry and yew finely inlaid with fillets and frieze also partly ebonised. Hinged globe on 3 scrolled legs, architectural style fitted interior with mirror-lined central compartment between canopy and stepped drawer, flanked by cylindrical drawers. ",
        price: "$2,350",
        image: "/images/globeTable.jpg",
        id: 2
      },
      {
        title: "The Harrington Commode",
        description:
          "The Harrington Commode is thought to have been crafted around 1770 by London cabinet maker Thomas Chippendale. The most splendid piece of English furniture is made of gilt-lacquered fustic, rosewood and tulipwood mounted with brass.",
        price: "$5,000",
        image: "/images/commode.jpg",
        id: 3
      },
      {
        title: "French Antique Sofa",
        description:
          "Luxury antique French sofa set in Louis XV style finished in golden leafs and made of first class beech wood and high quality fabrics.",
        price: "$1,050",
        image: "/images/sofa.jpg",
        id: 4
      },
      {
        title: "19th Century Venetian Mirror",
        description:
          "Octagonal crested Antique Venetian Mirror with reverse etched decoration to crests and outer margins. Original glass with bevelled centre plate. Original pine board back.",
        price: "$1,500",
        image: "/images/mirror.jpg",
        id: 5
      },
      {
        title: "1950s Gilt-Bronze Trolley",
        description:
          "A very fine circular polished brass bar cart with two levels, the borders of pierced brass supported on turned brass legs with concave stretchers, an ornate handle and raised on four brass wheels.",
        price: "$1,250",
        image: "/images/trolley.jpg",
        id: 6
      },
      {
        title: "Louis XVI style Gossip Bench",
        description:
          "French Louis XVI style gilt gossip seat. Two chairs side to side, perfect for a gossip. Hand carved gilt frame and upholstered in pale fabric.",
        price: "$2,900",
        image: "/images/bench.jpg",
        id: 7
      },
      {
        title: "18th Century Satinwood Armchair",
        description:
          "An exceptional George III satinwood open armchair in the manner of George Hepplewhite. Vertical splat carved with the Prince of Wales’s feathers, the caned seat fitted with blue silk cushions.",
        price: "$2,250",
        image: "/images/armchair.jpg",
        id: 8
      }
    ]
  },
  {
    id: "paintings",
    title: "Paintings",
    description:
      "The gallery houses an exceptional collection of antique paintings and contemporary art. Whether you wish to become the owner of rare oil on canvas paintings, portraits or landscape paintings, this museum quality collection will present some of the finest authentic works of art.",
    products: [
      {
        title: "The Gatehouse",
        description:
          "This is a stunning oil painting in a very good condition painted by William Samuel Parrott. The Gatehouse is part of the Old Customs house where all shipping had to stop before entering the marina. Image size: 44¾ x 57 inches, c. 1850.",
        price: "$550",
        image: "/images/gatehouse.jpg",
        id: 9
      },
      {
        title: "Nude",
        description:
          "Oil on canvas. Featuring a cubist portrait of nude. Attributed to Pablo Picasso (1881-1973, Spanish). 31.1 x 27.2 inches.",
        price: "$750",
        image: "/images/nude.jpg",
        id: 10
      },
      {
        title: "Westminster",
        description:
          "This is an atmospheric original etching by British Marine artist Rowland Langmaid. Etching with drypoint, image size: 5 5/8 x 8 inches, c. 1930, pencil signed and titled. A beautiful image of the silhouette of Westminster Abbey rising above the busy Thames River.",
        price: "$650",
        image: "/images/westminster.jpg",
        id: 11
      },
      {
        title: "Still Life Blue Vase",
        description:
          "Original oil on canvas painting by Robert Chailloux. Canvas measures 18 x 22 inches, signed. Painting is in perfect condition.",
        price: "$550",
        image: "/images/vase.jpg",
        id: 12
      },
      {
        title: "Young Beauty",
        description:
          "Pre-Raphaelite style painting of a young beautiful lady sitting in a garden. The painting of Guilio Pastine still retains its original embroidered frame. Signed and dated 1913, frame size: 51½ x 33 inches.",
        price: "$1,050",
        image: "/images/beauty.jpg",
        id: 13
      },
      {
        title: "Dartmoor",
        description:
          "Watercolour by William Henry Dyer, a painter in watercolour and sometimes oil, of Devon coastal and moorland scenes. Signed, c. 1910, frame size: 17½ x 21½ inches.",
        price: "$250",
        image: "/images/dartmoor.jpg",
        id: 14
      },
      {
        title: "Portrait miniature of a young couple",
        description:
          "This watercolour on ivory of early 19th century is beautifully painted with excellent colours and of lovely quality. The frame (4 x 3 inches) is solid heavy ivory with a gold surround or bezel.",
        price: "$2,000",
        image: "/images/portrait.jpg",
        id: 15
      },
      {
        title: "Mother and her brood",
        description:
          "19th century oil painting by Henry Schouten amous for his animal and chicken paintings. Signed, frame size: 35.5 x 40.25 inches.",
        price: "$2,500",
        image: "/images/chicken.jpg",
        id: 16
      },
      {
        title: "Japanese silk embroidery picture",
        description:
          "A superb Japanese silk embroidery picture of late 19th century using long and short stitch, with a pair of tigers stealthily moving through the forest. Frame size: 41¾ x 31 inches.",
        price: "$1,250",
        image: "/images/tigers.jpg",
        id: 17
      }
    ]
  },
  {
    id: "jewellery",
    title: "Jewellery",
    description:
      "We carry a great selection of vintage, antique, art deco, estate and pre-owned jewellery. This ever-changing collection of jewellery pieces featuring estate diamonds, Victorian necklaces, unique earrings, rings, brooches and cameos.",
    products: [
      {
        title: "Art Deco Diamond and Blue Sapphire Ring",
        description:
          "This Art Deco 14k white gold diamond and blue sapphire ring features one 0.06ct diamond, I1 clarity, F color and is accented by 4 square cut blue sapphires that showcase the filigree design. Weight 3.1 grams.",
        price: "$5,000",
        image: "/images/ring.jpg",
        id: 18
      },
      {
        title: "Vintage Shell Cameo Brooch Pendant",
        description:
          "This lovely vintage cameo brooch pendant is crafted of 14k gold and features a large hand carved shell cameo. The pendant measures 2 inches tall by 1 3/4 inches wide.",
        price: "$450",
        image: "/images/brooch.jpg",
        id: 19
      },
      {
        title: "Vintage Amethyst & Diamond Necklace",
        description:
          "Circa 1900 pendant features an elongated floral design with a round brilliant cut diamond. The 14K golden pendant measures 41.8mm long by 7.9mm wide on an 18.5-inch long, cable link chain.",
        price: "$3,000",
        image: "/images/necklace.jpg",
        id: 20
      },
      {
        title: "Art Nouveau Peridot & Pearl Necklace",
        description:
          "Circa 1900 Art Nouveau swag necklace features 9 faceted mixed cut peridot in bezel settings and 11 natural saltwater pearls. The necklace has an overall length of 16 inches long, finished with a spring ring clasp.",
        price: "$3,000",
        image: "/images/pearlNecklace.jpg",
        id: 21
      },
      {
        title: "Vintage Blue Zircon & Diamond Pendant",
        description:
          "Circa 1930s pendant is accented with 1 bezel set, round brilliant cut natural blue zircon and 1 round brilliant cut diamond. The pendant measures 17.5mm X 11.5mm and is suspended from a 14K white gold neck chain measuring 18 inches in length.",
        price: "$1,850",
        image: "/images/pendant.jpg",
        id: 22
      },
      {
        title: "Snake Bracelet",
        description:
          "Flexible bracelet in a form of a snake in yellow gold with scales decoration. The chiseled head is embellished with rubies for the eyes. Circa 1900. Total weight: 52 grams.",
        price: "$550",
        image: "/images/bracelet.jpg",
        id: 23
      },
      {
        title: "Demi-parure in gold, pearls and gems stones",
        description:
          "19th century demi-parure composed of a pair of earrings and a pendant-brooch. The set is finely chiselled with stylized geometric patterns and adorned with pearls and gemstones mounted.",
        price: "$2,000",
        image: "/images/parure.jpg",
        id: 24
      },
      {
        title: "Art deco box signed Janesich Paris",
        description:
          "Box set with rose-cut diamonds. Pushbutton crimped with rods sapphires. Circa 1935. (Gross) weight: 68 grams, 2 x 1 inches.",
        price: "$1,000",
        image: "/images/box.jpg",
        id: 25
      },
      {
        title: "Gothic revival earrings, cornelian cameos",
        description:
          "Pair of Gothic Revival earrings including frames embellished with enamel. 19th century. Total weight (gross): 10.85 grams, 1 x 1 inches.",
        price: "$1,250",
        image: "/images/earings.jpg",
        id: 26
      }
    ]
  }
];

module.exports = initialCatalogues;
