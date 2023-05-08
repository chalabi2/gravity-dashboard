import * as _127 from "./abci/types";
import * as _128 from "./crypto/keys";
import * as _129 from "./crypto/proof";
import * as _130 from "./libs/bits/types";
import * as _131 from "./p2p/types";
import * as _132 from "./types/block";
import * as _133 from "./types/evidence";
import * as _134 from "./types/params";
import * as _135 from "./types/types";
import * as _136 from "./types/validator";
import * as _137 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._127
  };
  export const crypto = {
    ..._128,
    ..._129
  };
  export namespace libs {
    export const bits = {
      ..._130
    };
  }
  export const p2p = {
    ..._131
  };
  export const types = {
    ..._132,
    ..._133,
    ..._134,
    ..._135,
    ..._136
  };
  export const version = {
    ..._137
  };
}