import * as _103 from "./applications/transfer/v1/genesis";
import * as _104 from "./applications/transfer/v1/query";
import * as _105 from "./applications/transfer/v1/transfer";
import * as _106 from "./applications/transfer/v1/tx";
import * as _107 from "./applications/transfer/v2/packet";
import * as _108 from "./core/channel/v1/channel";
import * as _109 from "./core/channel/v1/genesis";
import * as _110 from "./core/channel/v1/query";
import * as _111 from "./core/channel/v1/tx";
import * as _112 from "./core/client/v1/client";
import * as _113 from "./core/client/v1/genesis";
import * as _114 from "./core/client/v1/query";
import * as _115 from "./core/client/v1/tx";
import * as _116 from "./core/commitment/v1/commitment";
import * as _117 from "./core/connection/v1/connection";
import * as _118 from "./core/connection/v1/genesis";
import * as _119 from "./core/connection/v1/query";
import * as _120 from "./core/connection/v1/tx";
import * as _121 from "./core/port/v1/query";
import * as _122 from "./core/types/v1/genesis";
import * as _123 from "./lightclients/localhost/v1/localhost";
import * as _124 from "./lightclients/solomachine/v1/solomachine";
import * as _125 from "./lightclients/solomachine/v2/solomachine";
import * as _126 from "./lightclients/tendermint/v1/tendermint";
import * as _215 from "./applications/transfer/v1/tx.amino";
import * as _216 from "./core/channel/v1/tx.amino";
import * as _217 from "./core/client/v1/tx.amino";
import * as _218 from "./core/connection/v1/tx.amino";
import * as _219 from "./applications/transfer/v1/tx.registry";
import * as _220 from "./core/channel/v1/tx.registry";
import * as _221 from "./core/client/v1/tx.registry";
import * as _222 from "./core/connection/v1/tx.registry";
import * as _223 from "./applications/transfer/v1/query.lcd";
import * as _224 from "./core/channel/v1/query.lcd";
import * as _225 from "./core/client/v1/query.lcd";
import * as _226 from "./core/connection/v1/query.lcd";
import * as _227 from "./applications/transfer/v1/query.rpc.Query";
import * as _228 from "./core/channel/v1/query.rpc.Query";
import * as _229 from "./core/client/v1/query.rpc.Query";
import * as _230 from "./core/connection/v1/query.rpc.Query";
import * as _231 from "./core/port/v1/query.rpc.Query";
import * as _232 from "./applications/transfer/v1/tx.rpc.msg";
import * as _233 from "./core/channel/v1/tx.rpc.msg";
import * as _234 from "./core/client/v1/tx.rpc.msg";
import * as _235 from "./core/connection/v1/tx.rpc.msg";
import * as _239 from "./lcd";
import * as _240 from "./rpc.query";
import * as _241 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace transfer {
      export const v1 = {
        ..._103,
        ..._104,
        ..._105,
        ..._106,
        ..._215,
        ..._219,
        ..._223,
        ..._227,
        ..._232
      };
      export const v2 = {
        ..._107
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._108,
        ..._109,
        ..._110,
        ..._111,
        ..._216,
        ..._220,
        ..._224,
        ..._228,
        ..._233
      };
    }
    export namespace client {
      export const v1 = {
        ..._112,
        ..._113,
        ..._114,
        ..._115,
        ..._217,
        ..._221,
        ..._225,
        ..._229,
        ..._234
      };
    }
    export namespace commitment {
      export const v1 = {
        ..._116
      };
    }
    export namespace connection {
      export const v1 = {
        ..._117,
        ..._118,
        ..._119,
        ..._120,
        ..._218,
        ..._222,
        ..._226,
        ..._230,
        ..._235
      };
    }
    export namespace port {
      export const v1 = {
        ..._121,
        ..._231
      };
    }
    export namespace types {
      export const v1 = {
        ..._122
      };
    }
  }
  export namespace lightclients {
    export namespace localhost {
      export const v1 = {
        ..._123
      };
    }
    export namespace solomachine {
      export const v1 = {
        ..._124
      };
      export const v2 = {
        ..._125
      };
    }
    export namespace tendermint {
      export const v1 = {
        ..._126
      };
    }
  }
  export const ClientFactory = {
    ..._239,
    ..._240,
    ..._241
  };
}