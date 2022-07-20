### Open Source EZInterface bindings for NodeJS

A simple implementation of EZInterface using NodeJS and FFI for dll communication.

#### Requirements:

-   NodeJS 14+
-   ffi-napi requirements ([see there](https://github.com/node-ffi-napi/node-ffi-napi))

#### Roadmap:

-   Implement all dll functions **(37/278)**
-   Implement event mode (Async)

#### Usage:

```javascript
import EZInterface from 'ezinterfacejs';

const test = new EZInterface('127.0.0.1', 5123, 10000); //Host, port and timeout

test.testConnection();
console.log('Conexão OK');
const count = test.getDeliveriesCount();
console.log('Encontrado ' + count + ' abastecimentos.');

for (let index = count; index !== 0; index--) {
    const del_id = test.getDeliveryByOrdinal(index);
    console.log('Abastecimento ' + del_id + ': ');
    const abast = test.getDeliveryPropertiesEx4(del_id);
    console.log(abast);
    test.lockDelivery(del_id);
    test.clearDelivery(del_id, abast.dtype);
}
```

#### Contributing

1. Ensure any install or build dependencies are removed before the end of the layer when doing a
   build.
2. Update the README.md with details of changes to the interface, this includes new environment
   variables, exposed ports, useful file locations and container parameters.
3. Increase the version numbers in any examples files and the README.md to the new version that this
   Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you
   do not have permission to do that, you may request the second reviewer to merge it for you.

#### License

MIT License. See the `LICENSE` file.
