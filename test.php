<?php

require_once 'app/Mage.php';
umask(0);
//$app = Mage::app('default');
$app = Mage::app();
$array = array();
   $product = Mage::getModel('catalog/product')->load(315);               
$images = $product->getMediaGalleryImages();
			
			foreach ($images as $_image) {
				$tmp['hi_res'] = Mage::helper('catalog/image')->init($product, 'image', $_image->getFile())->__toString();
				$tmp['thumbnail'] = Mage::helper('catalog/image')->init($product, 'thumbnail', $_image->getFile())->resize(60, 60)->__toString();
				$tmp['base_image'] = Mage::helper('catalog/image')->init($product, 'image', $_image->getFile())->resize(400, 560)->__toString();
				$tmp['label'] = $_image->getLabel();
				$array[$product->getId()]['gallery'][] = $tmp;
			}
print_r($array );