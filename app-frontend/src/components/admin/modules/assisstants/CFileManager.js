import React from 'react';
import FileManager, {Column, Details, ItemView, Permissions} from 'devextreme-react/file-manager';
import axiosInstance from "../../../../services/api";
import AuthenticateAble from "../user/AuthenticateAble";
import Swal from "sweetalert2";
import "devextreme/dist/css/dx.material.purple.dark.compact.css";

const allowedFileExtensions = [];

/**
 * CFileManager Class Component
 */
class CFileManager extends AuthenticateAble {

    /**
     * constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            directoryTree: [],
            currentPath: '', //'Documents/Reports',
            shouldUpdate: false
        };

        this.updateDirectoryMap = this.updateDirectoryMap.bind(this);
        this.setDirectoryTree = this.setDirectoryTree.bind(this);
        this.setShouldUpdate = this.setShouldUpdate.bind(this);
        this.setMessages = this.setMessages.bind(this);
        this.onCurrentDirectoryChanged = this.onCurrentDirectoryChanged.bind(this);
        this.onDirectoryCreating = this.onDirectoryCreating.bind(this);
        this.onItemMoving = this.onItemMoving.bind(this);
        this.onItemRenaming = this.onItemRenaming.bind(this);
        this.onItemDeleting = this.onItemDeleting.bind(this);
    }

    /**
     * update directory map
     */
    updateDirectoryMap() {
        const url = `/api/${this.getLang()}/admin/multimedia/directory/map`;
        const data = {
            groupType: this.props.groupType
        };

        axiosInstance.post(url, data, this.config).then(response => {
            const result = response.data;
            if (result.success === true) {
                let directoryTree = [];

                directoryTree.push(result.data);
                this.setDirectoryTree(directoryTree);
            }
        }).catch(error => {
            this.handleError(error);
        });
    }

    /**
     * set directory tree
     *
     * @param comingDirectoryTree
     * @param e
     */
    setDirectoryTree(comingDirectoryTree, e) {
        this.setState({directoryTree: comingDirectoryTree})
    }

    /**
     * set should update
     *
     * @param turn
     * @param e
     */
    setShouldUpdate(turn, e) {
        this.setState({shouldUpdate: turn});
    }

    /**
     * on current directory changed
     *
     * @param e
     */
    onCurrentDirectoryChanged(e) {
        this.setState({
            currentPath: e.component.option('currentPath'),
        });
    }

    /**
     * on directory creating
     *
     * @param actionObj
     */
    onDirectoryCreating(actionObj) {
        const url = `/api/${this.getLang()}/admin/${this.props.module}/${this.props.fileType}/create/folder`;
        const data = {
            currentPath: this.state.currentPath,
            name: actionObj.name,
            parentId: actionObj.parentDirectory.dataItem.id,
            groupType: this.props.groupType
        };

        axiosInstance.post(url, data, this.config).then(response => {
            const result = response.data;
            if (result.success === true) {
                console.log('new folder created successfully');
            }
        }).catch(error => {
            this.handleError(error);
        });
    }

    /**
     * on item moving
     *
     * @param actionObj
     */
    onItemMoving(actionObj) {
        const id = actionObj.item.dataItem.id;
        const name = actionObj.item.dataItem.name;
        const parentId = actionObj.item.dataItem.parentId;
        const path = actionObj.item.path;

        const destinationId = actionObj.destinationDirectory.dataItem.id;
        const destinationName = actionObj.destinationDirectory.dataItem.name;
        const destinationPath = actionObj.destinationDirectory.path;

        const url = `/api/${this.getLang()}/admin/${this.props.module}/${this.props.fileType}/move/item/${id}`;
        const data = {
            name: name,
            parentId: parentId,
            path: path,
            destinationId: destinationId,
            destinationPath: destinationPath
        };

        axiosInstance.post(url, data, this.config).then(response => {
            const result = response.data;
            if (result.success === true) {
                Swal.fire('', `عملیات انتقال ${name} به ${destinationName} با موفقیت انجام شد.`, 'success').then(r => '');
            }
        }).catch(error => {
            this.handleError(error);
        });
    }

    /**
     * on item renaming
     *
     * @param actionObj
     * @param e
     */
    onItemRenaming(actionObj, e) {
        const id = actionObj.item.dataItem.id;
        const url = `/api/${this.getLang()}/admin/${this.props.module}/${this.props.fileType}/rename/item/${id}`;

        const oldName = actionObj.item.name;
        const newName = actionObj.newName;
        const data = {
            path: actionObj.item.path,
            isDir: actionObj.item.dataItem.isDirectory,
            oldName: oldName,
            newName: newName
        };

        axiosInstance.post(url, data, this.config).then(response => {
            const result = response.data;
            if (result.success === true) {
                Swal.fire('', ` آیتم ${oldName} به ${newName} تغییر نام یافت. `, 'success').then(r => {
                });
            }
        }).catch(error => {
            this.handleError(error);
        });
    }

    /**
     * on item deleting
     *
     * @param actionObj
     * @param e
     * @returns {boolean}
     */
    onItemDeleting(actionObj, e) {
        const name = actionObj.item.dataItem.name;
        const items = actionObj.item.dataItem.items ? actionObj.item.dataItem.items : '';

        if (items.length) {
            Swal.fire('', ` پوشه ی، ${name} دارای محتوا می باشد.`, 'error').then(r => '');
            e.preventDefault();
            return false;
        }

        const id = actionObj.item.dataItem.id;
        const url = `/api/${this.getLang()}/admin/${this.props.module}/${this.props.fileType}/delete/item/${id}`;
        const data = {
            isDir: actionObj.item.dataItem.isDirectory,
            path: actionObj.item.path
        };

        axiosInstance.post(url, data, this.config).then(response => {
            const result = response.data;
            if (result.success === true) {
                Swal.fire('', ` عملیات حذف ${name} با موفقیت انجام شد.`, 'success').then(r => '');
            }
        }).catch(error => {
            this.handleError(error);
        });

        return false;
    }

    /**
     * should component update
     *
     * @param nextProps
     * @param nextState
     * @param nextContext
     * @returns {boolean}
     */
    /*shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        let shouldUpdate = this.state.shouldUpdate;

        if (shouldUpdate) {
            console.log('should update');
        } else {
            console.log('not require update');
        }

        return shouldUpdate;
    }*/

    /**
     * component will mount
     */
    componentWillMount() {
        this.updateDirectoryMap();
        //this.setShouldUpdate(true);
    }

    /**
     * render
     *
     * @returns {JSX.Element}
     */
    render() {

        if(this.state.directoryTree.length === 0) {
            return false;
        }

        return (
            <FileManager
                currentPath={this.state.currentPath}
                fileSystemProvider={this.state.directoryTree}
                allowedFileExtensions={allowedFileExtensions}
                height={400}
                onCurrentDirectoryChanged={this.onCurrentDirectoryChanged}
                onDirectoryCreating={this.onDirectoryCreating}
                onItemMoving={this.onItemMoving}
                onItemRenaming={this.onItemRenaming}
                onItemDeleting={this.onItemDeleting}>
                <Permissions
                    create={true}
                    //copy={true}
                    move={true}
                    rename={true}
                    delete={true}>
                </Permissions>
                <ItemView>
                    <Details>
                        <Column dataField="thumbnail"/>
                        <Column dataField="name"/>
                        <Column dataField="dateModified" caption="Modified"/>
                        <Column dataField="dateCreated" caption="Created" dataType="date"/>
                        <Column dataField="modifiedBy" caption="Modified By" visibleIndex="2"/>
                    </Details>
                </ItemView>
            </FileManager>
        );
    }
}

export default CFileManager;