const initialCatalogues = [
  {
    id: "furniture",
    title: "Antique Furniture",
    description:
      "This extraordinary collection of antique furniture pieces includes rare cabinets dating 17th-century, 19th-century tables and chairs as well as 18th-century French furniture, English oak rarities, and American masterworks.",
    products: [
      {
        title: "French Gilt Bronze Tea Table",
        description:
          "Featuring exquisite curved gilt bronze mounts and a two-tier design, this tea table is the result of highly skilled craftsmanship. The upper tier of the table is topped with a diamond parquetry design, and is supported by scrolling gilt bronze mounts which take the form of cherubs and acanthus leaves. ",
        price: "$2500",
        image: "/images/table.jpg",
        id: 0
      },
      {
        title: "Danish Rococo Walnut Commode",
        description:
          "A very charming and small Danish parcel-gilt walnut and burr-walnut commode by Mathias Ortmann, mid-18th century. The shaped veneered top above moulded frieze with punched ground incised with foliate decoration above four shaped drawers flanked by canted angles on C-scrolled feet. ",
        price: "$3250",
        image: "/images/drawer.jpg",
        id: 1
      },
      {
        title: "Black Quartz Lamp",
        description:
          "A rare gilded polished brass flower lamp by Willy Daro, France, 1970s with large black quartz stones (possibly amethyst). Signed on the base.",
        price: "$550",
        image: "/images/lamp.jpg",
        id: 2
      },
      {
        title: "Louis XV Marquetry Commode",
        description:
          "The transitional gilt bronze-mounted tulipwood and fruitwood marquetry commode from 18th centure with a brèche d'Alep marble top.",
        price: "$3000",
        image: "/images/commode.jpg",
        id: 3
      },
      {
        title: "Baroque Style Chaise Longue",
        description:
          "This fabulous and large baroque style chaise longue has a beautiful burgundy velvet fabric. Frame color is made with gold leaf.",
        price: "$1050",
        image: "/images/sofa.jpg",
        id: 4
      },
      {
        title: "Venetian Mirror",
        description:
          "Octagonal crested Venetian Mirror with reverse etched decoration to crests and outer margins. Original glass with bevelled centre plate. Original pine board back.",
        price: "$1500",
        image: "/images/mirror.jpg",
        id: 5
      },
      {
        title: "Gilt-Bronze Trolley",
        description:
          "A very fine circular polished brass bar cart with two levels, the borders of pierced brass supported on turned brass legs with concave stretchers, an ornate handle and raised on four brass wheels.",
        price: "$1250",
        image: "/images/trolley.jpg",
        id: 6
      },
      {
        title: "Louis XVI Gossip Bench",
        description:
          "French Louis XVI style gilt gossip seat. Two chairs side to side, perfect for a gossip. Hand carved gilt frame and upholstered in pale fabric.",
        price: "$2900",
        image: "/images/bench.jpg",
        id: 7
      }
      // {
      //   title: "Mahogany Open Armchair",
      //   description:
      //     "A late 19th century mahogany open armchair in the Chippendale style. The back has pierced radiating wheel splats with a carved central patera.",
      //   price: "$2250",
      //   image: "/images/chair.jpeg",
      //   id: 8
      // }
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
        price: "$850",
        image: "/images/gatehouse.jpg",
        id: 9
      },
      {
        title: "La Chiesa Gesuati",
        description:
          "Oil on canvas. This highly detailed composition by Federico del Campo details a panoramic view of a Venetian canal. Dated 1899. 31.1 x 27.2 inches.",
        price: "$2750",
        image: "/images/chiesa.png",
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
        title: "Gather Ye Rosebuds While Ye May",
        description:
          "Oil painting on canvas created in 1908 by British Pre-Raphaelite artist, John William Waterhouse. Frame size: 51½ x 33 inches.",
        price: "$1050",
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
        title: "Sunset on Lake George",
        description:
          "This exceptional Hudson River School landscape is the work of American artist Louis Rémy Mignot. Circa 1860. Frame: 24 x 34 inches.",
        price: "$2000",
        image: "/images/sunset.png",
        id: 15
      },
      {
        title: "Mother and Her Brood",
        description:
          "19th century oil painting by Henry Schouten amous for his animal and chicken paintings. Signed, frame size: 35.5 x 40.25 inches.",
        price: "$1500",
        image: "/images/chicken.jpg",
        id: 16
      },
      {
        title: "The Sea at Grandcamp",
        description:
          "This tranquil seascape is the work of the great Georges Seurat, one of the most important and innovative artists of all time. Frame size: 41¾ x 31 inches.",
        price: "$1250",
        image: "/images/mer.png",
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
        title: "Art Deco Diamond & Blue Sapphire Ring",
        description:
          "This Art Deco 14k white gold diamond and blue sapphire ring features one 0.06ct diamond, I1 clarity, F color and is accented by 4 square cut blue sapphires that showcase the filigree design. Weight 3.1 grams.",
        price: "$5000",
        image: "/images/ring.png",
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
        price: "$3000",
        image: "/images/necklace.jpg",
        id: 20
      },
      {
        title: "Art Nouveau Peridot & Pearl Necklace",
        description:
          "Circa 1900 Art Nouveau swag necklace features 9 faceted mixed cut peridot in bezel settings and 11 natural saltwater pearls. The necklace has an overall length of 16 inches long, finished with a spring ring clasp.",
        price: "$3000",
        image: "/images/pearlNecklace.jpg",
        id: 21
      },
      {
        title: "Vintage Blue Zircon & Diamond Pendant",
        description:
          "Circa 1930s pendant is accented with 1 bezel set, round brilliant cut natural blue zircon and 1 round brilliant cut diamond. The pendant measures 17.5mm X 11.5mm and is suspended from a 14K white gold neck chain measuring 18 inches in length.",
        price: "$1850",
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
        price: "$2000",
        image: "/images/parure.jpg",
        id: 24
      },
      {
        title: "Enamel and Diamond Powder Box by Cartier",
        description:
          "The inky black of the enamel paired with diamond set shapes. In the interior of the box, the mirror has been replaced with a yellow gold insert engraved with “Mrs. Paul E. Gardner.” Circa 1930. (Gross) weight: 68 grams, 2 x 1 inches.",
        price: "$1000",
        image: "/images/box.jpg",
        id: 25
      },
      {
        title: "Victorian Gold & Micro Mosaic Scarab Earrings",
        description:
          "A pair of Victorian Egyptian Revival scarab beetle earrings in 15ct gold. The Scarabs are made in Micro Mosaic, which is an Italian inlaid glass technique. Circa 1870",
        price: "$1950",
        image: "/images/earrings.jpg",
        id: 26
      }
    ]
  }
];

module.exports = initialCatalogues;
