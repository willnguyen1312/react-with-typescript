const get = require("lodash/get");

const media = {
  partnerId: "b98219c8e1da4028ab39f57cf9314168",
  localId: 4,
  state: "ready",
  title: "evp-demo-pdf",
  description: "",
  id: "efbec59471b644dfba3764eb1a615c03",
  evidenceId: "efbec59471b644dfba3764eb1a615c03",
  redactionToExtractionMap: {},
  workItemsInfo: [],
  evidenceChildren: [],
  legacyExtractions: [],
  clipToExtractionMap: {},
  uploadRedactions: [],
  realFiles: [
    {
      checksum: {
        alg: "sha2",
        range_specific: "false",
        value:
          "dca3e39b2c25eec146e0bb48842de410ccef886b5f3457c5d1632efeef1a3abe"
      },
      content_descriptor: "",
      content_type: "application/pdf",
      date_created: "8/29/2019 8:24:47 PM",
      display_options: null,
      file_id: "db923a08aec246e682be44cd13868d42",
      partner_id: "b98219c8e1da4028ab39f57cf9314168",
      scan_required: "false",
      scan_result: "clean",
      size: "892115",
      status: "available",
      type: "master_copy"
    }
  ],
  clipIndexing: {
    numRedactions: 0,
    numClips: 0,
    numSkinBlurs: 0
  },
  files: [
    {
      id: "db923a08aec246e682be44cd13868d42",
      mediaType: "pdf",
      duration: 1,
      annotations: [],
      evidenceId: "efbec59471b644dfba3764eb1a615c03",
      sources: [
        {
          type: "pdf",
          format: "application/pdf",
          url:
            "/api/v1/media/document/view?file_id=db923a08aec246e682be44cd13868d42&partner_id=b98219c8e1da4028ab39f57cf9314168&evidence_id=efbec59471b644dfba3764eb1a615c03"
        }
      ]
    }
  ]
};

console.log(get(media, "realFiles.0.content_type"));
