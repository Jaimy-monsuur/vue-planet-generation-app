import * as THREE from 'three';

export default class PlanetGeometry extends THREE.BufferGeometry {
    constructor(radius, widthSegments = 32, heightSegments = 32, textures) {
        super();

        // Arrays to hold the geometry data
        const positions = [];
        const normals = [];
        const uvs = [];
        const indices = [];

        // Create a texture loader
        const textureLoader = new THREE.TextureLoader();

        // Create an array of materials from the given textures
        const materials = textures.map((texture) => {
            return new THREE.MeshStandardMaterial({
                map: textureLoader.load(texture),
                roughness: 1,
            });
        });

        // Total number of vertices in the geometry
        const totalVertices = (widthSegments + 1) * (heightSegments + 1);

        // Create vertices, normals, and uvs
        for (let heightIndex = 0; heightIndex <= heightSegments; heightIndex++) {
            const theta = heightIndex * Math.PI / heightSegments;
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);

            for (let widthIndex = 0; widthIndex <= widthSegments; widthIndex++) {
                const phi = widthIndex * 2 * Math.PI / widthSegments;
                const sinPhi = Math.sin(phi);
                const cosPhi = Math.cos(phi);

                const x = cosPhi * sinTheta;
                const y = cosTheta;
                const z = sinPhi * sinTheta;

                const u = 1 - widthIndex / widthSegments;
                const v = heightIndex / heightSegments;

                normals.push(x, y, z);
                uvs.push(u, v);
                positions.push(radius * x, radius * y, radius * z);
            }
        }

        // Create faces and assign material indices
        for (let heightIndex = 0; heightIndex < heightSegments; heightIndex++) {
            for (let widthIndex = 0; widthIndex < widthSegments; widthIndex++) {
                const first = heightIndex * (widthSegments + 1) + widthIndex;
                const second = first + (widthSegments + 1);

                indices.push(first, second + 1, second);
                indices.push(first, first + 1, second + 1);

                // Randomly select a material for this face
                const materialIndex = Math.floor(Math.random() * materials.length);

                // Calculate the index of the face in the index buffer
                const faceIndex = heightIndex * widthSegments + widthIndex;

                // Add a group for this face with the correct material index
                this.addGroup(faceIndex * 6, 6, materialIndex);
            }
        }

        // Set the index and attribute buffers for the geometry
        this.setIndex(indices);
        this.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        this.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
        this.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

        // Set the materials for the geometry
        this.material = materials;
    }
}
