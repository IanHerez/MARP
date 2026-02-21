// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title BlitzCollection
 * @notice Colección ERC1155 para Monad Blitz CDMX
 * @dev Mint público, múltiples tipos de items
 */
contract BlitzCollection is ERC1155, Ownable {
    using Strings for uint256;

    // Nombre de la colección
    string public name = "Monad Blitz Collection";
    string public symbol = "BLITZ";

    // Contador de IDs
    uint256 public nextTokenId = 1;

    // Metadata base URI
    string private _baseTokenURI;

    // Mapping de token ID a supply máximo (0 = ilimitado)
    mapping(uint256 => uint256) public maxSupply;
    
    // Mapping de token ID a supply actual
    mapping(uint256 => uint256) public totalSupply;

    // Mapping de token ID a nombre
    mapping(uint256 => string) public tokenNames;

    // Eventos
    event ItemCreated(uint256 indexed tokenId, string name, uint256 maxSupply);
    event ItemMinted(address indexed to, uint256 indexed tokenId, uint256 amount);

    constructor(string memory baseURI) ERC1155(baseURI) Ownable(msg.sender) {
        _baseTokenURI = baseURI;
        
        // Crear items iniciales
        _createItem("Blitz Badge", 0);        // ID 1 - Ilimitado
        _createItem("Builder Pass", 100);      // ID 2 - Limitado a 100
        _createItem("Monad OG", 50);           // ID 3 - Limitado a 50
    }

    /**
     * @notice Crear un nuevo tipo de item
     * @param itemName Nombre del item
     * @param supply Supply máximo (0 = ilimitado)
     */
    function createItem(string memory itemName, uint256 supply) external onlyOwner returns (uint256) {
        return _createItem(itemName, supply);
    }

    function _createItem(string memory itemName, uint256 supply) internal returns (uint256) {
        uint256 tokenId = nextTokenId++;
        tokenNames[tokenId] = itemName;
        maxSupply[tokenId] = supply;
        
        emit ItemCreated(tokenId, itemName, supply);
        return tokenId;
    }

    /**
     * @notice Mint público - cualquiera puede mintear
     * @param tokenId ID del item a mintear
     * @param amount Cantidad a mintear
     */
    function mint(uint256 tokenId, uint256 amount) external {
        require(tokenId > 0 && tokenId < nextTokenId, "Item no existe");
        require(amount > 0, "Amount debe ser > 0");
        
        if (maxSupply[tokenId] > 0) {
            require(
                totalSupply[tokenId] + amount <= maxSupply[tokenId],
                "Excede max supply"
            );
        }

        totalSupply[tokenId] += amount;
        _mint(msg.sender, tokenId, amount, "");
        
        emit ItemMinted(msg.sender, tokenId, amount);
    }

    /**
     * @notice Mint batch - mintear múltiples items
     * @param tokenIds Array de IDs
     * @param amounts Array de cantidades
     */
    function mintBatch(uint256[] memory tokenIds, uint256[] memory amounts) external {
        require(tokenIds.length == amounts.length, "Arrays length mismatch");

        for (uint256 i = 0; i < tokenIds.length; i++) {
            require(tokenIds[i] > 0 && tokenIds[i] < nextTokenId, "Item no existe");
            
            if (maxSupply[tokenIds[i]] > 0) {
                require(
                    totalSupply[tokenIds[i]] + amounts[i] <= maxSupply[tokenIds[i]],
                    "Excede max supply"
                );
            }
            
            totalSupply[tokenIds[i]] += amounts[i];
        }

        _mintBatch(msg.sender, tokenIds, amounts, "");
    }

    /**
     * @notice Obtener URI del token
     */
    function uri(uint256 tokenId) public view override returns (string memory) {
        require(tokenId > 0 && tokenId < nextTokenId, "Item no existe");
        return string(abi.encodePacked(_baseTokenURI, tokenId.toString(), ".json"));
    }

    /**
     * @notice Actualizar base URI
     */
    function setBaseURI(string memory newBaseURI) external onlyOwner {
        _baseTokenURI = newBaseURI;
    }

    /**
     * @notice Ver todos los items disponibles
     */
    function getItemInfo(uint256 tokenId) external view returns (
        string memory itemName,
        uint256 currentSupply,
        uint256 maxItemSupply,
        bool available
    ) {
        require(tokenId > 0 && tokenId < nextTokenId, "Item no existe");
        
        itemName = tokenNames[tokenId];
        currentSupply = totalSupply[tokenId];
        maxItemSupply = maxSupply[tokenId];
        available = maxItemSupply == 0 || currentSupply < maxItemSupply;
    }

    /**
     * @notice Total de tipos de items
     */
    function totalItems() external view returns (uint256) {
        return nextTokenId - 1;
    }
}
